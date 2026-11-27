import SidebarButton from "@/components/sidebar/sidebar-views/SidebarButton"
import { useViews } from "@/context/ViewContext"
import { useAppContext } from "@/context/AppContext"
import useResponsive from "@/hooks/useResponsive"
import { VIEWS } from "@/types/view"
import toast from "react-hot-toast"

const views = [
    VIEWS.FILES,
    VIEWS.TASKS,
    VIEWS.CHATS,
    VIEWS.MEDIA,
    VIEWS.RUN,
    VIEWS.CLIENTS,
    VIEWS.SETTINGS,
]

export default function Sidebar() {
    const {
        activeView,
        isSidebarOpen,
        viewComponents,
        viewIcons,
    } = useViews()

    const { currentUser } = useAppContext()
    const { minHeightReached } = useResponsive()

    const copyRoom = async () => {
        try {
            await navigator.clipboard.writeText(
                currentUser.roomId,
            )
            toast.success("Room ID copied")
        } catch {
            toast.error("Copy the room ID from the address bar")
        }
    }

    return (
        <aside className="orbit-sidebar">
            <nav
                className={`orbit-rail ${
                    minHeightReached ? "orbit-rail-hidden" : ""
                }`}
                aria-label="Workspace navigation"
            >
                <span
                    className="orbit-mark orbit-rail-brand"
                    title="CodeOrbit"
                >
                    CO
                </span>

                {views.map((view) => (
                    <SidebarButton
                        key={view}
                        viewName={view}
                        icon={viewIcons[view]}
                    />
                ))}
            </nav>

            {isSidebarOpen && (
                <section className="orbit-panel">
                    <header className="orbit-panel-header">
                        <div>
                            <strong>CodeOrbit</strong>
                            <small title={currentUser.username}>
                                {currentUser.username || "Workspace"}
                            </small>
                        </div>

                        <button
                            type="button"
                            className="orbit-copy"
                            onClick={copyRoom}
                        >
                            Copy room ID
                        </button>
                    </header>

                    <div className="orbit-panel-content">
                        {viewComponents[activeView]}
                    </div>
                </section>
            )}
        </aside>
    )
}