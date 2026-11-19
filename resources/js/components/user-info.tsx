import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import type { User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user: User;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();

    return (
        <>
            <Avatar className="h-32px w-32px overflow-hidden br-999px">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="br-10px bgc-grayTheme5 c-grayTheme12">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="d-grid flex-1 text-align-left fs-14px lh-1.25">
                <span className="overflow-hidden text-overflow-ellipsis white-space-nowrap fw-500">{user.name}</span>
                {showEmail && (
                    <span className="overflow-hidden text-overflow-ellipsis white-space-nowrap fs-12px c-grayTheme11">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}
