/**
 * Tooltip and Button Styles
 * Modern tooltip styling with dark mode support
 */

export const tooltipStyles = {
    backgroundColor: '#1f1f1f',
    padding: '8px 14px',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '500',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 9999,
}

export const buttonStyles = {
    base: "relative flex items-center justify-center rounded-lg transition-all duration-200 ease-in-out p-2.5",
    hover: "hover:bg-neutral-100 dark:hover:bg-neutral-800",
    active: "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400",
}

