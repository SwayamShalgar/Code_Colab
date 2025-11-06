/**
 * Button Component - Modern, accessible button with multiple variants
 * 
 * Features:
 * - Multiple variants (primary, secondary, ghost, danger)
 * - Size options (sm, md, lg)
 * - Loading state with spinner
 * - Full width option
 * - Icon support
 * - Keyboard navigation (ARIA compliant)
 */

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import cn from 'classnames'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    isLoading?: boolean
    isFullWidth?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    children: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isLoading = false,
            isFullWidth = false,
            leftIcon,
            rightIcon,
            disabled,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none'

        const variantStyles = {
            primary:
                'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white shadow-sm hover:shadow-md focus:ring-primary-500',
            secondary:
                'bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600 text-neutral-900 dark:text-neutral-100 shadow-sm focus:ring-neutral-500',
            ghost:
                'bg-transparent hover:bg-neutral-100 active:bg-neutral-200 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 text-neutral-700 dark:text-neutral-300 focus:ring-neutral-500',
            danger:
                'bg-danger-500 hover:bg-danger-600 active:bg-danger-700 text-white shadow-sm hover:shadow-md focus:ring-danger-500',
            success:
                'bg-success-500 hover:bg-success-600 active:bg-success-700 text-white shadow-sm hover:shadow-md focus:ring-success-500',
        }

        const sizeStyles = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2.5 text-base',
            lg: 'px-6 py-3 text-lg',
        }

        const widthStyles = isFullWidth ? 'w-full' : ''

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    baseStyles,
                    variantStyles[variant],
                    sizeStyles[size],
                    widthStyles,
                    className
                )}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {!isLoading && leftIcon && <span className="inline-flex">{leftIcon}</span>}
                <span>{children}</span>
                {!isLoading && rightIcon && <span className="inline-flex">{rightIcon}</span>}
            </button>
        )
    }
)

Button.displayName = 'Button'

export default Button
