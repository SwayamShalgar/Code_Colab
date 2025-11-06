/**
 * IconButton Component - Button designed specifically for icons
 * 
 * Features:
 * - Multiple variants
 * - Size options
 * - Tooltip integration
 * - Active state
 * - ARIA label for accessibility
 */

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import cn from 'classnames'

export type IconButtonVariant = 'default' | 'primary' | 'ghost' | 'danger' | 'success'
export type IconButtonSize = 'sm' | 'md' | 'lg'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: IconButtonVariant
    size?: IconButtonSize
    icon: ReactNode
    isActive?: boolean
    ariaLabel: string
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        {
            variant = 'default',
            size = 'md',
            icon,
            isActive = false,
            ariaLabel,
            disabled,
            className,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            'inline-flex items-center justify-center rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed'

        const variantStyles = {
            default:
                'bg-transparent hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 text-neutral-700 dark:text-neutral-300 focus:ring-neutral-500',
            primary:
                'bg-primary-100 hover:bg-primary-200 active:bg-primary-300 dark:bg-primary-900/30 dark:hover:bg-primary-900/50 dark:active:bg-primary-900/70 text-primary-600 dark:text-primary-400 focus:ring-primary-500',
            ghost:
                'bg-transparent hover:bg-neutral-100/50 active:bg-neutral-200/50 dark:hover:bg-neutral-800/50 dark:active:bg-neutral-700/50 text-neutral-600 dark:text-neutral-400 focus:ring-neutral-500',
            danger:
                'bg-danger-100 hover:bg-danger-200 active:bg-danger-300 dark:bg-danger-900/30 dark:hover:bg-danger-900/50 dark:active:bg-danger-900/70 text-danger-600 dark:text-danger-400 focus:ring-danger-500',
            success:
                'bg-success-100 hover:bg-success-200 active:bg-success-300 dark:bg-success-900/30 dark:hover:bg-success-900/50 dark:active:bg-success-900/70 text-success-600 dark:text-success-400 focus:ring-success-500',
        }

        const sizeStyles = {
            sm: 'p-1.5 text-sm',
            md: 'p-2 text-base',
            lg: 'p-2.5 text-lg',
        }

        const activeStyles = isActive
            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
            : ''

        return (
            <button
                ref={ref}
                disabled={disabled}
                aria-label={ariaLabel}
                className={cn(
                    baseStyles,
                    variantStyles[variant],
                    sizeStyles[size],
                    isActive && activeStyles,
                    className
                )}
                {...props}
            >
                {icon}
            </button>
        )
    }
)

IconButton.displayName = 'IconButton'

export default IconButton
