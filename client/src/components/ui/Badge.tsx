/**
 * Badge Component - Small status indicators and labels
 * 
 * Features:
 * - Multiple variants (primary, secondary, success, warning, danger, info)
 * - Size options (sm, md, lg)
 * - Dot indicator option
 * - Removable option with callback
 */

import { HTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'
import { IoClose } from 'react-icons/io5'

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant
    size?: BadgeSize
    dot?: boolean
    removable?: boolean
    onRemove?: () => void
    children: ReactNode
}

const Badge = ({
    variant = 'primary',
    size = 'md',
    dot = false,
    removable = false,
    onRemove,
    className,
    children,
    ...props
}: BadgeProps) => {
    const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-200'

    const variantStyles = {
        primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
        secondary: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300',
        success: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-300',
        warning: 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-300',
        danger: 'bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-300',
        info: 'bg-info-100 text-info-700 dark:bg-info-900/30 dark:text-info-300',
        neutral: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
    }

    const sizeStyles = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    }

    const dotStyles = {
        primary: 'bg-primary-500',
        secondary: 'bg-secondary-500',
        success: 'bg-success-500',
        warning: 'bg-warning-500',
        danger: 'bg-danger-500',
        info: 'bg-info-500',
        neutral: 'bg-neutral-500',
    }

    const dotSizeStyles = {
        sm: 'w-1.5 h-1.5',
        md: 'w-2 h-2',
        lg: 'w-2.5 h-2.5',
    }

    return (
        <span
            className={cn(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            {...props}
        >
            {dot && (
                <span
                    className={cn(
                        'rounded-full',
                        dotStyles[variant],
                        dotSizeStyles[size]
                    )}
                    aria-hidden="true"
                />
            )}
            <span>{children}</span>
            {removable && onRemove && (
                <button
                    onClick={onRemove}
                    className="inline-flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
                    aria-label="Remove"
                    type="button"
                >
                    <IoClose className="w-3 h-3" />
                </button>
            )}
        </span>
    )
}

export default Badge
