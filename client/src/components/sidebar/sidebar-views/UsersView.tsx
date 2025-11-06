import Users from "@/components/common/Users"
import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import useResponsive from "@/hooks/useResponsive"
import { USER_STATUS } from "@/types/user"
import toast from "react-hot-toast"
import { GoSignOut } from "react-icons/go"
import { IoShareOutline } from "react-icons/io5"
import { LuCopy } from "react-icons/lu"
import { useNavigate } from "react-router-dom"

function UsersView() {
    const navigate = useNavigate()
    const { viewHeight } = useResponsive()
    const { setStatus } = useAppContext()
    const { socket } = useSocket()

    const copyURL = async () => {
        const url = window.location.href
        try {
            await navigator.clipboard.writeText(url)
            toast.success("URL copied to clipboard")
        } catch (error) {
            toast.error("Unable to copy URL to clipboard")
            console.log(error)
        }
    }

    const shareURL = async () => {
        const url = window.location.href
        try {
            await navigator.share({ url })
        } catch (error) {
            toast.error("Unable to share URL")
            console.log(error)
        }
    }

    const leaveRoom = () => {
        socket.disconnect()
        setStatus(USER_STATUS.DISCONNECTED)
        navigate("/", {
            replace: true,
        })
    }

    return (
        <div className="flex flex-col p-4" style={{ height: viewHeight }}>
            <h1 className="view-title">Connected Users</h1>
            {/* List of connected users */}
            <Users />
            <div className="flex flex-col items-center gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex w-full gap-2">
                    {/* Share URL button */}
                    <button
                        className="flex flex-1 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 p-3 text-neutral-900 dark:text-neutral-100 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        onClick={shareURL}
                        title="Share Link"
                        aria-label="Share room link"
                    >
                        <IoShareOutline size={22} />
                    </button>
                    {/* Copy URL button */}
                    <button
                        className="flex flex-1 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 p-3 text-neutral-900 dark:text-neutral-100 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        onClick={copyURL}
                        title="Copy Link"
                        aria-label="Copy room link"
                    >
                        <LuCopy size={20} />
                    </button>
                    {/* Leave room button */}
                    <button
                        className="flex flex-1 items-center justify-center rounded-lg bg-danger-500 hover:bg-danger-600 active:bg-danger-700 p-3 text-white transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-danger-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                        onClick={leaveRoom}
                        title="Leave room"
                        aria-label="Leave room"
                    >
                        <GoSignOut size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UsersView
