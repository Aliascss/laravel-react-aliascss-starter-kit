import { KeyRound, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import type { Passkey } from '@/types/auth';

type Props = {
    passkey: Passkey;
    onDelete: (id: number, onError: () => void) => void;
};

export default function PasskeyItem({ passkey, onDelete }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        onDelete(passkey.id, () => setIsDeleting(false));
    };

    return (
        <div className="d-flex aic jcsb border-bottom-width-1px border-color-grayTheme6 p-16px --last-child-border-bottom-width-0">
            <div className="d-flex aic g-16px">
                <div className="d-flex h-40px w-40px flex-shrink-0 aic jcc br-14px bgc-grayTheme3">
                    <KeyRound className="h-20px w-20px c-grayTheme11" />
                </div>
                <div className="d-grid g-4px">
                    <div className="d-flex aic g-10px">
                        <p className="fw-500 les--0.025em">
                            {passkey.name}
                        </p>
                        {passkey.authenticator && (
                            <span className="d-inline-flex aic g-4px br-8px bgc-grayTheme3 padding(2px_8px) fs-11px fw-500 les-0.025em c-grayTheme11 text-transform-uppercase box-shadow(inset_0_0_0_1px_var(--x-border-color)) --x-border-color:grayTheme6">
                                {passkey.authenticator}
                            </span>
                        )}
                    </div>
                    <p className="fs-14px lh-20px c-grayTheme11">
                        Added {passkey.created_at_diff}
                        {passkey.last_used_at_diff && (
                            <>
                                <span className="margin-inline-4px c-grayTheme11/0.5">
                                    /
                                </span>
                                Last used {passkey.last_used_at_diff}
                            </>
                        )}
                    </p>
                </div>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="c-redTheme11 --hover[bgc-redTheme9/0.1,c-redTheme11]"
                    >
                        <Trash2 className="h-16px w-16px" />
                        <span className="sr-only">Remove</span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Remove passkey</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to remove the "{passkey.name}"
                        passkey? You will no longer be able to use it to sign
                        in.
                    </DialogDescription>
                    <DialogFooter className="g-8px">
                        <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Removing...' : 'Remove passkey'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
