import React from 'react'
import type { DaySchedule } from '@/pages/My Schedule/types'
import { MY_SCHEDULE } from '@/app/styles/colors'

const FilledSlotFooter: React.FC<DaySchedule.Body.FilledSlot.FilledSlotFooterProps> = ({ roomNumber, onRemove }) => {
    return (
        <div className="flex justify-between items-end mt-2">
            <p className="text-sm" style={{ color: MY_SCHEDULE.TEXT_SECONDARY }}>Room: {roomNumber || 'N/A'}</p>
            <button
                onClick={onRemove}
                className="py-1 px-2 rounded text-xs transition-colors"
                style={{ backgroundColor: MY_SCHEDULE.REMOVE_BUTTON_BG, color: MY_SCHEDULE.REMOVE_BUTTON_TEXT }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = MY_SCHEDULE.REMOVE_BUTTON_BG_HOVER}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = MY_SCHEDULE.REMOVE_BUTTON_BG}
            >
                Remove
            </button>
        </div>
    )
}

export default FilledSlotFooter
