/**
 * Select Component Wrapper
 * Uses the new UI Select component for consistency
 */

import { ChangeEvent } from "react"
import { Select as UISelect } from "@/components/ui"

interface SelectProps {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
    value: string
    options: string[]
    title: string
}

function Select({ onChange, value, options, title }: SelectProps) {
    return (
        <UISelect
            label={title}
            value={value}
            onChange={onChange}
            options={options}
            selectSize="md"
        />
    )
}

export default Select
