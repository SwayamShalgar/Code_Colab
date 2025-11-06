/**
 * SidebarButton Component - Navigation button for sidebar views
 * 
 * Design improvements:
 * - Modern hover and active states
 * - Smooth transitions
 * - Better notification badge styling
 * - Improved accessibility
 */

import { useChatRoom } from "@/context/ChatContext"
import { useViews } from "@/context/ViewContext"
import { VIEWS } from "@/types/view"
import { useState } from "react"
import { Tooltip } from "react-tooltip"
import { tooltipStyles } from "../tooltipStyles"
import cn from "classnames"

interface ViewButtonProps {
    viewName: VIEWS
    icon: JSX.Element
}

const ViewButton = ({ viewName, icon }: ViewButtonProps) => {
    const { activeView, setActiveView, isSidebarOpen, setIsSidebarOpen } =
        useViews()
    const { isNewMessage } = useChatRoom()
    const [showTooltip, setShowTooltip] = useState(true)

    const isActive = activeView === viewName && isSidebarOpen

    const handleViewClick = (viewName: VIEWS) => {
        if (viewName === activeView) {
            setIsSidebarOpen(!isSidebarOpen)
        } else {
            setIsSidebarOpen(true)
            setActiveView(viewName)
        }
    }

    return (
        <div className="relative flex flex-col items-center">
            <button
                onClick={() => handleViewClick(viewName)}
                onMouseEnter={() => setShowTooltip(true)}
                className={cn(
                    "relative flex items-center justify-center rounded-lg p-2.5 transition-all duration-200 ease-in-out",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1",
                    "active:scale-95",
                    isActive
                        ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 shadow-sm"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                )}
                aria-label={`View ${viewName}`}
                aria-pressed={isActive}
                {...(showTooltip && {
                    "data-tooltip-id": `tooltip-${viewName}`,
                    "data-tooltip-content": viewName,
                })}
            >
                <div className="flex items-center justify-center text-xl">
                    {icon}
                </div>
                
                {/* Active indicator */}
                {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full md:top-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-0 md:w-6 md:h-1"></div>
                )}
                
                {/* Notification badge for new messages */}
                {viewName === VIEWS.CHATS && isNewMessage && (
                    <div className="absolute right-1 top-1">
                        <span className="flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-500"></span>
                        </span>
                    </div>
                )}
            </button>
            
            {/* Tooltip */}
            {showTooltip && (
                <Tooltip
                    id={`tooltip-${viewName}`}
                    place="right"
                    offset={25}
                    className="!z-[9999]"
                    style={tooltipStyles}
                    noArrow={false}
                    positionStrategy="fixed"
                    float={true}
                />
            )}
        </div>
    )
}

export default ViewButton
