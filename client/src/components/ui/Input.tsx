/**
 * Input Component - Modern, accessible text input
 * 
 * Features:
 * - Label and error message support
 * - Icon support (left and right)
 * - Various sizes
 * - Full width option
 * - Disabled state
 * - ARIA compliant for accessibility
 */

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    helperText?: string
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    inputSize?: InputSize
    isFullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            inputSize = 'md',
            isFullWidth = true,
            className,
            id,
            disabled,
            ...props
        },
        ref
    ) => {
        const inputId = id || props.name || `input-${Math.random().toString(36).substr(2, 9)}`

        const baseInputStyles =
            'rounded-lg border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 transition-all duration-200 ease-in-out disabled:bg-neutral-100 dark:disabled:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60'

        const sizeStyles = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2.5 text-base',
            lg: 'px-5 py-3 text-lg',
        }

        const iconPaddingStyles = {
            left: {
                sm: 'pl-9',
                md: 'pl-11',
                lg: 'pl-12',
            },
            right: {
                sm: 'pr-9',
                md: 'pr-11',
                lg: 'pr-12',
            },
        }

        const borderStyles = error
            ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500'
            : 'border-neutral-300 dark:border-neutral-700 focus:border-primary-500 focus:ring-primary-500'

        const widthStyles = isFullWidth ? 'w-full' : ''

        return (
            <div className={cn('flex flex-col gap-1.5', isFullWidth && 'w-full')}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                    >
                        {label}
                    </label>
                )}

                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        disabled={disabled}
                        className={cn(
                            baseInputStyles,
                            sizeStyles[inputSize],
                            borderStyles,
                            widthStyles,
                            leftIcon && iconPaddingStyles.left[inputSize],
                            rightIcon && iconPaddingStyles.right[inputSize],
                            className
                        )}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={
                            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
                        }
                        {...props}
                    />

                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400">
                            {rightIcon}
                        </div>
                    )}
                </div>

                {error && (
                    <p
                        id={`${inputId}-error`}
                        className="text-sm text-danger-500 dark:text-danger-400 animate-slide-down"
                        role="alert"
                    >
                        {error}
                    </p>
                )}

                {!error && helperText && (
                    <p
                        id={`${inputId}-helper`}
                        className="text-sm text-neutral-500 dark:text-neutral-400"
                    >
                        {helperText}
                    </p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'

export default Input
