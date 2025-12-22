import React from 'react'
import type { DaySchedule } from '@/pages/My Schedule/types'

const DayScheduleBody: React.FC<DaySchedule.Body.Props> = ({ children }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {children}
        </div>
    )
}

export default DayScheduleBody
