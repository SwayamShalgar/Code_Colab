/**
 * Select Component - Modern dropdown select input
 * 
 * Features:
 * - Label and error message support
 * - Custom styling with icon
 * - Size options
 * - Full width option
 * - Disabled state
 * - ARIA compliant
 */

import { forwardRef, SelectHTMLAttributes } from 'react'
import cn from 'classnames'
import { PiCaretDownBold } from 'react-icons/pi'

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectOption {
    value: string
    label: string
    disabled?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    helperText?: string
    options: SelectOption[] | string[]
    selectSize?: SelectSize
    isFullWidth?: boolean
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            label,
            error,
            helperText,
            options,
            selectSize = 'md',
            isFullWidth = true,
            className,
            id,
            disabled,
            ...props
        },
        ref
    ) => {
        const selectId = id || props.name || `select-${Math.random().toString(36).substr(2, 9)}`

        const baseSelectStyles =
            'appearance-none rounded-lg border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 transition-all duration-200 ease-in-out disabled:bg-neutral-100 dark:disabled:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer'

        const sizeStyles = {
            sm: 'px-3 py-1.5 pr-8 text-sm',
            md: 'px-4 py-2.5 pr-10 text-base',
            lg: 'px-5 py-3 pr-12 text-lg',
        }

        const borderStyles = error
            ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500'
            : 'border-neutral-300 dark:border-neutral-700 focus:border-primary-500 focus:ring-primary-500'

        const widthStyles = isFullWidth ? 'w-full' : ''

        // Normalize options to SelectOption format
        const normalizedOptions: SelectOption[] = options.map((option) =>
            typeof option === 'string'
                ? { value: option, label: option.charAt(0).toUpperCase() + option.slice(1) }
                : option
        )

        return (
            <div className={cn('flex flex-col gap-1.5', isFullWidth && 'w-full')}>
                {label && (
                    <label
                        htmlFor={selectId}
                        className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                    >
                        {label}
                    </label>
                )}

                <div className="relative">
                    <select
                        ref={ref}
                        id={selectId}
                        disabled={disabled}
                        className={cn(
                            baseSelectStyles,
                            sizeStyles[selectSize],
                            borderStyles,
                            widthStyles,
                            className
                        )}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={
                            error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
                        }
                        {...props}
                    >
                        {normalizedOptions.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <PiCaretDownBold
                        className={cn(
                            'absolute top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 dark:text-neutral-400',
                            selectSize === 'sm' && 'right-2.5 text-sm',
                            selectSize === 'md' && 'right-3 text-base',
                            selectSize === 'lg' && 'right-4 text-lg'
                        )}
                    />
                </div>

                {error && (
                    <p
                        id={`${selectId}-error`}
                        className="text-sm text-danger-500 dark:text-danger-400 animate-slide-down"
                        role="alert"
                    >
                        {error}
                    </p>
                )}

                {!error && helperText && (
                    <p
                        id={`${selectId}-helper`}
                        className="text-sm text-neutral-500 dark:text-neutral-400"
                    >
                        {helperText}
                    </p>
                )}
            </div>
        )
    }
)

Select.displayName = 'Select'

export default Select
