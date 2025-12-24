import React from 'react'
import type { TermSettings } from '@/pages/Settings/types'
import { SETTINGS, GLOBAL } from '@/app/styles/colors'

const TermItemBodySemester: React.FC<TermSettings.Content.TermList.TermItem.Body.SemesterProps> = ({ name, children }) => {
    return (
        <div
            className="p-3 rounded-lg border border-transparent"
            style={{ backgroundColor: SETTINGS.SEMESTER_BG }}
        >
            <div className="text-[10px] uppercase tracking-wider font-bold mb-1.5" style={{ color: GLOBAL.TEXT_TERTIARY }}>
                {name} Semester
            </div>
            <div className="text-sm font-medium" style={{ color: SETTINGS.BODY_TEXT }}>
                {children}
            </div>
        </div>
    )
}

export default TermItemBodySemester
