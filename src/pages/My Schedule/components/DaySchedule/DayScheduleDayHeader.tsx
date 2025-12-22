import React from 'react'
import type { DaySchedule } from '@/pages/My Schedule/types'
import { MY_SCHEDULE } from '@/app/styles/colors'

const DayScheduleHeader: React.FC<DaySchedule.HeaderProps> = ({ title }) => {
    return (
        <h3 className="text-xl font-semibold mb-4" style={{ color: MY_SCHEDULE.TEXT_HEADER }}>{title}</h3>
    )
}

export default DayScheduleHeader
