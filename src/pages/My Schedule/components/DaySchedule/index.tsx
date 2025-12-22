import React from 'react'
import type { DaySchedule } from '@/pages/My Schedule/types'

const DaySchedule: React.FC<DaySchedule.Props> = ({ children }) => {
    return (
        <div>{children}</div>
    )
}

export default DaySchedule
