import React from 'react'

interface ScheduleTypeDropdownOptionProps {
    value: string
    children: React.ReactNode
}

const ScheduleTypeDropdownOption: React.FC<ScheduleTypeDropdownOptionProps> = ({ value, children }) => {
    return (
        <option value={value}>{children}</option>
    )
}

export default ScheduleTypeDropdownOption
