import React, { useState } from 'react'
import type { ScheduleSettings } from '@/pages/Settings/types'

const ScheduleTypeDropdown: React.FC<ScheduleSettings.Content.ScheduleTypeDropdown.Props> = ({ className, children, defaultValue = 'alternating-ab' }) => {
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