import { useFlashToast } from '@/hooks/use-flash-toast';
import { useAppearance } from '@/hooks/use-appearance';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

function Toaster({ ...props }: ToasterProps) {
    const { appearance } = useAppearance();

    useFlashToast();

    return (
        <Sonner
            theme={appearance}
            position="bottom-right"
            style={
                {
                    // The same colours as the grayTheme1 / grayTheme12 / grayTheme6 tokens
                    '--normal-bg': 'light-dark(#fcfcfc, #111111)',
                    '--normal-text': 'light-dark(#202020, #eeeeee)',
                    '--normal-border': 'light-dark(#d9d9d9, #3a3a3a)',
                } as React.CSSProperties
            }
            {...props}
        />
    );
}

export { Toaster };
