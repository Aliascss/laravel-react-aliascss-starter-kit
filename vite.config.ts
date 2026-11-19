import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import compileAliasCSS from 'aliascss/lib/node/compileFile.js';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig, lazyPlugins } from 'vite-plus';
import aliascssConfig from './aliascss.config.js';

/**
 * Compiles AliasCSS class names into resources/css/aliascss.css (which
 * resources/css/app.css imports): once when Vite starts, and again whenever a
 * source file changes while `npm run dev` is running.
 */
function aliascss(): Plugin {
    const output = resolve(aliascssConfig.output.location);
    // Compile to a scratch file first, so Vite only ever sees finished CSS
    const scratch = resolve('node_modules/.cache/aliascss/aliascss.css');
    const sources = /[\\/]resources[\\/](js|views)[\\/].+\.(tsx?|jsx?|blade\.php)$/;
    let running = false;
    let queued = false;
    let isBuild = false;

    async function compile(): Promise<void> {
        if (running) {
            queued = true;

            return;
        }

        running = true;

        // The compiler logs one line per file it reads; keep only its warnings
        const log = console.log;
        console.log = (...args: unknown[]): void => {
            if (!String(args[0]).startsWith('AliasCSS compiled')) {
                log(...args);
            }
        };

        try {
            mkdirSync(dirname(scratch), { recursive: true });
            writeFileSync(scratch, '');
            await compileAliasCSS({
                ...aliascssConfig,
                // Production builds merge AliasCSS's one-declaration rules (less than half the size)
                minify: isBuild || aliascssConfig.minify,
                output: { ...aliascssConfig.output, location: scratch },
            });

            const css = readFileSync(scratch, 'utf8');

            if (!existsSync(output) || readFileSync(output, 'utf8') !== css) {
                writeFileSync(output, css);
            }
        } finally {
            console.log = log;
            running = false;
        }

        if (queued) {
            queued = false;
            await compile();
        }
    }

    return {
        name: 'aliascss',
        config(_config, { command }) {
            isBuild = command === 'build';

            // app.css imports this file, so it has to exist before Vite reads it
            if (!existsSync(output)) {
                mkdirSync(dirname(output), { recursive: true });
                writeFileSync(output, '');
            }
        },
        async buildStart() {
            await compile();
        },
        configureServer(server) {
            let timer: ReturnType<typeof setTimeout> | undefined;

            const onChange = (file: string): void => {
                if (!sources.test(file)) {
                    return;
                }

                clearTimeout(timer);
                timer = setTimeout(() => void compile(), 50);
            };

            server.watcher.on('add', onChange);
            server.watcher.on('change', onChange);
            server.watcher.on('unlink', onChange);
        },
    };
}

export default defineConfig({
    plugins: lazyPlugins(() => [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        inertia(),
        react(),
        babel({
            presets: [reactCompilerPreset()],
        }),
        aliascss(),
        wayfinder({
            formVariants: true,
        }),
    ]),
    build: {
        // AliasCSS theme colours use light-dark() and relative colours. Keep the
        // CSS minifier from rewriting them for older browsers, which would stop
        // the appearance switch from working.
        cssTarget: ['chrome123', 'edge123', 'firefox128', 'safari18'],
    },
    server: {
        watch: {
            ignored: [
                '**/.agents/**',
                '**/.claude/**',
                '**/.cursor/**',
                '**/.junie/**',
                '**/vendor/**',
            ],
        },
    },
    lint: {
        ignorePatterns: [
            'vendor/**',
            'node_modules/**',
            'public/**',
            'bootstrap/ssr/**',
            'resources/js/actions/**',
            'resources/js/components/ui/*',
            'resources/js/routes/**',
            'resources/js/wayfinder/**',
        ],
        options: {
            denyWarnings: true,
            typeAware: true,
        },
    },
    fmt: {
        printWidth: 80,
        tabWidth: 4,
        singleQuote: true,
        semi: true,
        singleAttributePerLine: false,
        htmlWhitespaceSensitivity: 'css',
        ignorePatterns: [
            '.github/**',
            'composer.json',
            'resources/js/components/ui/*',
            'resources/views/mail/*',
            'resources/css/aliascss.css',
        ],
    },
});
