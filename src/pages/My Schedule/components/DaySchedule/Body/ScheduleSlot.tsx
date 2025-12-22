import React from 'react'
import type { DaySchedule } from '@/pages/My Schedule/types'
import FilledSlot, { FilledSlotHeader, FilledSlotFooter } from '@/pages/My Schedule/components/DaySchedule/Body/FilledSlot'
import EmptySlot from '@/pages/My Schedule/components/DaySchedule/Body/EmptySlot'
import { MY_SCHEDULE } from '@/app/styles/colors'

const ScheduleSlot: React.FC<DaySchedule.Body.ScheduleSlotProps> = ({
    dayType,
    index,
    classId,
    getClassById,
    onRemove,
    onSelect
}) => {
    const classInfo = classId ? getClassById(classId) : null

    return (
        <div className="mb-4">
            <h5 className="text-sm font-medium mb-2 text-center" style={{ color: MY_SCHEDULE.TEXT_SECONDARY }}>Period {index + 1}</h5>
            {classInfo ? (
                <FilledSlot classInfo={classInfo}>
                    <FilledSlotHeader
                        name={classInfo.name}
                        teacherName={classInfo.teacherName}
                    />
                    <FilledSlotFooter
                        roomNumber={classInfo.roomNumber}
                        onRemove={() => onRemove(dayType, index)}
                    />
                </FilledSlot>
            ) : (
                <EmptySlot onClick={() => onSelect(dayType, index)} />
            )}
        </div>
    )
}

export default ScheduleSlot
