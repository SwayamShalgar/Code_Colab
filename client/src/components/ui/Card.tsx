/**
 * Card Component - Modern, flexible card container
 * 
 * Features:
 * - Multiple variants (default, bordered, elevated)
 * - Hover effect option
 * - Padding control
 * - Header and footer sections
 * - Glass morphism option
 */

import { HTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'

export type CardVariant = 'default' | 'bordered' | 'elevated' | 'glass'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant
    padding?: CardPadding
    hoverable?: boolean
    children: ReactNode
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

const Card = ({
    variant = 'default',
    padding = 'md',
    hoverable = false,
    className,
    children,
    ...props
}: CardProps) => {
    const baseStyles = 'rounded-xl transition-all duration-200 ease-in-out'

    const variantStyles = {
        default: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800',
        bordered: 'bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700',
        elevated: 'bg-white dark:bg-neutral-900 shadow-md border border-neutral-100 dark:border-neutral-800',
        glass: 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/50',
    }

    const paddingStyles = {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-6',
    }

    const hoverStyles = hoverable
        ? 'hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-700 hover:-translate-y-0.5 cursor-pointer'
        : ''

    return (
        <div
            className={cn(
                baseStyles,
                variantStyles[variant],
                paddingStyles[padding],
                hoverStyles,
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

const CardHeader = ({ className, children, ...props }: CardHeaderProps) => {
    return (
        <div
            className={cn(
                'pb-4 mb-4 border-b border-neutral-200 dark:border-neutral-800',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

const CardBody = ({ className, children, ...props }: CardBodyProps) => {
    return (
        <div className={cn('', className)} {...props}>
            {children}
        </div>
    )
}

const CardFooter = ({ className, children, ...props }: CardFooterProps) => {
    return (
        <div
            className={cn(
                'pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-800',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
