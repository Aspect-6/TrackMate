import React from 'react'
import type { DaySchedule } from '@/pages/My Schedule/types'

const FilledSlot: React.FC<DaySchedule.Body.FilledSlot.Props> = ({ classInfo, children }) => {
    return (
        <div
            className="class-card p-4 rounded-lg flex flex-col min-h-[200px]"
            style={{ borderLeft: `4px solid ${classInfo.color}` }}
        >
            {children}
        </div>
    )
}

export default FilledSlot

export { default as FilledSlotHeader } from './FilledSlotHeader'
export { default as FilledSlotFooter } from './FilledSlotFooter'