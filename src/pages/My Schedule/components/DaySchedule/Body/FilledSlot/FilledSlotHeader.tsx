import React from 'react'
import type { DaySchedule } from '@/pages/My Schedule/types'
import { MY_SCHEDULE } from '@/app/styles/colors'

const FilledSlotHeader: React.FC<DaySchedule.Body.FilledSlot.FilledSlotHeaderProps> = ({ name, teacherName }) => {
    return (
        <div className="flex-grow">
            <h4 className="font-semibold" style={{ color: MY_SCHEDULE.TEXT_PRIMARY }}>{name}</h4>
            <p className="text-sm pt-1" style={{ color: MY_SCHEDULE.TEXT_SECONDARY }}>{teacherName || 'N/A'}</p>
        </div>
    )
}

export default FilledSlotHeader
