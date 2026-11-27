import { useChatRoom } from "@/context/ChatContext"
import { useViews } from "@/context/ViewContext"
import { VIEWS } from "@/types/view"

interface ViewButtonProps {
    viewName: VIEWS
    icon: JSX.Element
}

const labels: Record<VIEWS, string> = {
    [VIEWS.FILES]: "Files",
    [VIEWS.TASKS]: "Tasks",
    [VIEWS.CHATS]: "Chat",
    [VIEWS.MEDIA]: "Calls",
    [VIEWS.RUN]: "Run",
    [VIEWS.CLIENTS]: "Team",
    [VIEWS.SETTINGS]: "Settings",
    [VIEWS.COPILOT]: "Assistant",
}

export default function SidebarButton({
    viewName,
    icon,
}: ViewButtonProps) {
    const {
        activeView,
        setActiveView,
        isSidebarOpen,
        setIsSidebarOpen,
    } = useViews()

    const { isNewMessage } = useChatRoom()
    const active = activeView === viewName && isSidebarOpen

    const openView = () => {
        setIsSidebarOpen(
            activeView === viewName ? !isSidebarOpen : true,
        )
        setActiveView(viewName)
    }

    return (
        <button
            type="button"
            className="orbit-nav-button"
            aria-label={labels[viewName]}
            aria-pressed={active}
            title={labels[viewName]}
            onClick={openView}
        >
            <span aria-hidden="true">{icon}</span>
            <span className="orbit-nav-label">
                {labels[viewName]}
            </span>

            {viewName === VIEWS.CHATS && isNewMessage && (
                <span
                    className="orbit-unread"
                    role="status"
                    aria-label="Unread messages"
                />
            )}
        </button>
    )
}