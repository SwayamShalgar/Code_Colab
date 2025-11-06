/**
 * Users Component - Display active users in the room
 * 
 * Design improvements:
 * - Modern card-based layout
 * - Better status indicators with animation
 * - Improved spacing and typography
 * - Hover effects
 */

import { useAppContext } from "@/context/AppContext"
import { RemoteUser, USER_CONNECTION_STATUS } from "@/types/user"
import Avatar from "react-avatar"
import { Badge } from "@/components/ui"

function Users() {
    const { users } = useAppContext()

    return (
        <div className="flex min-h-[200px] flex-grow justify-center overflow-y-auto py-2 px-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full h-fit">
                {users.map((user) => {
                    return <User key={user.socketId} user={user} />
                })}
            </div>
        </div>
    )
}

const User = ({ user }: { user: RemoteUser }) => {
    const { username, status, isAdmin } = user
    const isOnline = status === USER_CONNECTION_STATUS.ONLINE
    const title = `${username}${isAdmin ? ' (Admin)' : ''} - ${isOnline ? "online" : "offline"}`

    return (
        <div
            className="relative flex flex-col items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 cursor-default group"
            title={title}
        >
            {/* Admin crown badge */}
            {isAdmin && (
                <div className="absolute -top-2 -right-2 z-10">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-warning-400 dark:bg-warning-500 shadow-md ring-2 ring-white dark:ring-neutral-900">
                        <span className="text-xs">👑</span>
                    </div>
                </div>
            )}

            {/* Avatar with status indicator */}
            <div className="relative">
                <Avatar 
                    name={username} 
                    size="56" 
                    round={"12px"} 
                    title={title}
                    className={`ring-2 transition-all duration-200 ${
                        isAdmin 
                            ? "ring-warning-400 dark:ring-warning-500 group-hover:ring-warning-500 dark:group-hover:ring-warning-400"
                            : "ring-neutral-200 dark:ring-neutral-700 group-hover:ring-primary-400 dark:group-hover:ring-primary-600"
                    }`}
                />
                {/* Status indicator with pulse animation */}
                <div className="absolute -bottom-1 -right-1">
                    <span className="relative flex h-4 w-4">
                        {isOnline && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                        )}
                        <span
                            className={`relative inline-flex rounded-full h-4 w-4 ring-2 ring-white dark:ring-neutral-800 ${
                                isOnline
                                    ? "bg-success-500"
                                    : "bg-neutral-400 dark:bg-neutral-600"
                            }`}
                        ></span>
                    </span>
                </div>
            </div>

            {/* Username and badges */}
            <div className="flex flex-col items-center gap-1 w-full">
                <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 line-clamp-1 max-w-full text-ellipsis break-words text-center">
                        {username}
                    </p>
                </div>
                <div className="flex gap-1.5">
                    {isAdmin && (
                        <Badge 
                            variant="warning" 
                            size="sm"
                            className="text-xs"
                        >
                            Admin
                        </Badge>
                    )}
                    <Badge 
                        variant={isOnline ? "success" : "neutral"} 
                        size="sm"
                        className="text-xs"
                    >
                        {isOnline ? "Online" : "Offline"}
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default Users
