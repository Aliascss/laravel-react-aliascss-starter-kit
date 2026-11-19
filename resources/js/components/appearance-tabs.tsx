import type { LucideIcon } from 'lucide-react';
import { Monitor, Moon, Sun } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { acss, cn } from '@/lib/utils';

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div
            className={cn(
                acss('d-inline-flex g-4px br-10px bgc-grayTheme3 p-4px'),
                className,
            )}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        acss('d-flex aic br-8px padding(6px_14px) transition(color_0.15s,background-color_0.15s)'),
                        appearance === value
                            ? acss('bgc(light-dark(white,#404040)) c-grayTheme12 box-shadow(0_1px_2px_0_rgb(0_0_0_/_0.05))')
                            : acss('c-grayTheme11 --hover[bgc-grayTheme5/0.6,c-grayTheme12]'),
                    )}
                >
                    <Icon className="margin-left--4px h-16px w-16px" />
                    <span className="margin-left-6px fs-14px lh-20px">{label}</span>
                </button>
            ))}
        </div>
    );
}
