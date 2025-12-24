import React from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { Trash2, Calendar, Clock, Edit2 } from 'lucide-react'
import { SETTINGS, GLOBAL } from '@/app/styles/colors'
import { formatMediumDate } from '@/app/lib/utils'

const TermList: React.FC = () => {
    const { academicTerms, openModal } = useApp()

    if (academicTerms.length === 0) {
        return (
            <button
                onClick={() => openModal('add-term')}
                className="w-full text-center py-8 text-sm border-2 border-dashed rounded-xl transition-colors cursor-pointer term-empty-state"
                style={{ borderColor: SETTINGS.CARD_BORDER, color: GLOBAL.TEXT_SECONDARY }}
            >
                No academic terms yet. Click to add term.
            </button>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            {academicTerms.map((term) => (
                <div
                    key={term.id}
                    className="p-5 rounded-xl border transition-all"
                    style={{
                        backgroundColor: SETTINGS.MODAL_BG,
                        borderColor: SETTINGS.CARD_BORDER,
                        color: SETTINGS.BODY_TEXT
                    }}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
                                <Calendar size={18} style={{ color: GLOBAL.PAGE_HEADER_TEXT }} />
                                <span>{term.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs ml-0.5" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                                <Clock size={12} />
                                <span>{formatMediumDate(term.startDate)} — {formatMediumDate(term.endDate)}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 -mr-2 -mt-2">
                            <button
                                onClick={() => openModal('edit-term', term.id)}
                                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                                style={{ color: GLOBAL.TEXT_SECONDARY }}
                                title="Edit Term"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={() => openModal('delete-term', term.id)}
                                className="p-2 rounded-lg hover:bg-red-500/10 transition-all"
                                style={{ color: GLOBAL.DELETE_BUTTON_BG }}
                                title="Delete Term"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {term.semesters?.map(sem => (
                            <div
                                key={sem.id}
                                className="p-3 rounded-lg border border-transparent"
                                style={{ backgroundColor: SETTINGS.SEMESTER_BG }}
                            >
                                <div className="text-[10px] uppercase tracking-wider font-bold mb-1.5" style={{ color: GLOBAL.TEXT_TERTIARY }}>
                                    {sem.name} Semester
                                </div>
                                <div className="text-sm font-medium" style={{ color: SETTINGS.BODY_TEXT }}>
                                    {formatMediumDate(sem.startDate)} — {formatMediumDate(sem.endDate)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TermList
