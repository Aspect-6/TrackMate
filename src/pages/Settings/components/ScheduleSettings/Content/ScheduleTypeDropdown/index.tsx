import React, { useState } from 'react'

interface ScheduleTypeDropdownProps {
    className?: string
    children: React.ReactNode
    defaultValue: string
}

const ScheduleTypeDropdown: React.FC<ScheduleTypeDropdownProps> = ({ className, children, defaultValue = 'alternating-ab' }) => {
    const [value, setValue] = useState(defaultValue)

    return (
        <div className={className}>
            <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="settings-select"
            >
                {children}
            </select>
        </div>
    )
}

export default ScheduleTypeDropdown