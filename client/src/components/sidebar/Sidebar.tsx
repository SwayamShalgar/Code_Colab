/**
 * Sidebar Component - Modern navigation sidebar with activity switcher
 * 
 * Design improvements:
 * - Cleaner visual design with subtle borders
 * - Better spacing and alignment
 * - Smooth transitions and hover effects
 * - Improved mobile responsiveness
 * - Enhanced accessibility with proper ARIA labels
 */

import SidebarButton from "@/components/sidebar/sidebar-views/SidebarButton"
import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { useViews } from "@/context/ViewContext"
import useResponsive from "@/hooks/useResponsive"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { ACTIVITY_STATE } from "@/types/app"
import { SocketEvent } from "@/types/socket"
import { VIEWS } from "@/types/view"
import { IoCodeSlash } from "react-icons/io5"
import { MdOutlineDraw } from "react-icons/md"
import cn from "classnames"
import { Tooltip } from 'react-tooltip'
import { useState } from 'react'
import { tooltipStyles } from "./tooltipStyles"

function Sidebar() {
    const {
        activeView,
        isSidebarOpen,
        viewComponents,
        viewIcons,
        setIsSidebarOpen,
    } = useViews()
    const { minHeightReached } = useResponsive()
    const { activityState, setActivityState } = useAppContext()
    const { socket } = useSocket()
    const { isMobile } = useWindowDimensions()
    const [showTooltip, setShowTooltip] = useState(true)

    const changeState = () => {
        setShowTooltip(false)
        if (activityState === ACTIVITY_STATE.CODING) {
            setActivityState(ACTIVITY_STATE.DRAWING)
            socket.emit(SocketEvent.REQUEST_DRAWING)
        } else {
            setActivityState(ACTIVITY_STATE.CODING)
        }

        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }

    return (
        <aside className="flex w-full md:h-full md:max-h-full md:min-h-full md:w-auto">
            {/* Navigation Bar */}
            <div
                className={cn(
                    "fixed bottom-0 left-0 z-50 flex h-[60px] w-full gap-2 self-end overflow-hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2 shadow-lg md:shadow-none md:static md:h-full md:w-[60px] md:min-w-[60px] md:flex-col md:border-r md:border-t-0 md:p-3 md:pt-4 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95",
                    {
                        hidden: minHeightReached,
                    },
                )}
            >
                {/* Main Navigation Buttons */}
                <div className="flex gap-2 md:flex-col md:gap-2 flex-1 md:flex-initial">
                    <SidebarButton
                        viewName={VIEWS.FILES}
                        icon={viewIcons[VIEWS.FILES]}
                    />
                    <SidebarButton
                        viewName={VIEWS.CHATS}
                        icon={viewIcons[VIEWS.CHATS]}
                    />
                    {/* Copilot view commented out - can be enabled later */}
                    {/* <SidebarButton
                        viewName={VIEWS.COPILOT}
                        icon={viewIcons[VIEWS.COPILOT]}
                    /> */}
                    <SidebarButton
                        viewName={VIEWS.RUN}
                        icon={viewIcons[VIEWS.RUN]}
                    />
                    <SidebarButton
                        viewName={VIEWS.CLIENTS}
                        icon={viewIcons[VIEWS.CLIENTS]}
                    />
                    <SidebarButton
                        viewName={VIEWS.SETTINGS}
                        icon={viewIcons[VIEWS.SETTINGS]}
                    />
                </div>

                {/* Spacer for desktop to push activity toggle to bottom */}
                <div className="hidden md:block md:flex-1"></div>

                {/* Activity State Toggle Button (Coding/Drawing) */}
                <div className="flex items-center justify-center">
                    <button
                        className={cn(
                            "flex items-center justify-center rounded-lg p-2.5 transition-all duration-200 ease-in-out",
                            "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                            "active:scale-95",
                            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1",
                            activityState === ACTIVITY_STATE.CODING
                                ? "text-primary-600 dark:text-primary-400"
                                : "text-secondary-600 dark:text-secondary-400"
                        )}
                        onClick={changeState}
                        onMouseEnter={() => setShowTooltip(true)}
                        data-tooltip-id="activity-state-tooltip"
                        data-tooltip-content={
                            activityState === ACTIVITY_STATE.CODING
                                ? "Switch to Drawing Mode"
                                : "Switch to Coding Mode"
                        }
                        aria-label={
                            activityState === ACTIVITY_STATE.CODING
                                ? "Switch to Drawing Mode"
                                : "Switch to Coding Mode"
                        }
                    >
                        {activityState === ACTIVITY_STATE.CODING ? (
                            <MdOutlineDraw size={22} />
                        ) : (
                            <IoCodeSlash size={22} />
                        )}
                    </button>
                    {showTooltip && (
                        <Tooltip
                            id="activity-state-tooltip"
                            place="right"
                            offset={15}
                            className="!z-[9999]"
                            style={tooltipStyles}
                            noArrow={false}
                            positionStrategy="fixed"
                            float={true}
                        />
                    )}
                </div>
            </div>

            {/* Sidebar Content Panel */}
            <div
                className={cn(
                    "absolute left-0 top-0 z-20 w-full flex-col bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 shadow-xl md:shadow-none md:static md:min-w-[320px] md:max-w-[320px] transition-all duration-300 ease-in-out",
                    !isSidebarOpen && "hidden"
                )}
            >
                {/* Render the active view component */}
                {viewComponents[activeView]}
            </div>
        </aside>
    )
}

export default Sidebar
