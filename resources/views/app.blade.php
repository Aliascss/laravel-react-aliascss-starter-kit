<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="x-theme --x-page-bg:grayTheme1 --x-page-color:grayTheme12">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Apply the saved appearance before the page paints. AliasCSS theme colours follow color-scheme. --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';
                const dark = appearance === 'dark'
                    || (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

                document.documentElement.classList.toggle('dark', dark);
                document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
            })();
        </script>

        {{-- Inline style to set the HTML background color before the stylesheet loads (grayTheme1) --}}
        <style>
            html {
                background-color: #fcfcfc;
            }

            html.dark {
                background-color: #111111;
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    {{-- Focus-ring colours used by the ui components --}}
    <body class="--x-ring-color:grayTheme8/0.5 --x-ring-strong-color:grayTheme8 --x-ring-danger-color:redTheme9/0.25">
        <x-inertia::app />
    </body>
</html>
