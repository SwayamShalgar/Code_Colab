/**
 * ThemeToggle Component - Toggle between light and dark modes
 * 
 * Features:
 * - Smooth transitions
 * - Icon animation
 * - Keyboard accessible
 */

import { useTheme } from "@/context/ThemeContext"
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5"
import { IconButton } from "@/components/ui"

const ThemeToggle = () => {
    const { resolvedTheme, toggleTheme } = useTheme()

    return (
        <IconButton
            variant="ghost"
            size="md"
            icon={
                resolvedTheme === 'dark' ? (
                    <IoSunnyOutline size={20} className="transition-transform duration-300 hover:rotate-180" />
                ) : (
                    <IoMoonOutline size={20} className="transition-transform duration-300 hover:-rotate-12" />
                )
            }
            onClick={toggleTheme}
            ariaLabel={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            className="transition-transform duration-200 hover:scale-110"
        />
    )
}

export default ThemeToggle
