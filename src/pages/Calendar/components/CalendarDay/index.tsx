import React, { useState } from 'react';
import { CalendarDayProps } from '@/pages/Calendar/types';
import CalendarDayAssignment from '@/pages/Calendar/components/CalendarDay/CalendarDayAssignment';
import CalendarDayEvent from '@/pages/Calendar/components/CalendarDay/CalendarDayEvent';
import { CALENDAR } from '@/app/styles/colors';

const CalendarDay: React.FC<CalendarDayProps> = ({
    day,
    month,
    year,
    isToday,
    noSchool,
    assignments,
    events,
    onSelectDate,
    onAssignmentClick,
    onEventClick,
    getClassColor
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const mobileDots = [
        ...assignments.map(a => ({ id: `assignment-${a.id}`, color: getClassColor(a.classId) })),
        ...events.map(e => ({ id: `event-${e.id}`, color: e.color }))
    ];

    return (
        <div
            onClick={() => onSelectDate(new Date(year, month, day))}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="border-r border-b p-2 overflow-y-auto relative cursor-pointer transition-colors"
            style={{
                borderColor: CALENDAR.GRID_BORDER,
                backgroundColor: isHovered ? CALENDAR.DAY_BG_HOVER : (isToday ? CALENDAR.TODAY_BG : (noSchool ? CALENDAR.NO_SCHOOL_BG : undefined)),
                backgroundImage: noSchool ? CALENDAR.NO_SCHOOL_PATTERN : undefined,
                boxShadow: isToday ? `inset 0 0 0 2px ${CALENDAR.TODAY_BORDER}` : undefined
            }}
        >
            <span className="font-bold block mb-1" style={{ color: noSchool ? CALENDAR.NO_SCHOOL_TEXT : CALENDAR.DAY_NUMBER_TEXT }}>{day}</span>

            {mobileDots.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-1 md:hidden">
                    {mobileDots.map(dot => (
                        <span
                            key={dot.id}
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: dot.color }}
                        />
                    ))}
                </div>
            )}

            <div className="space-y-1 overflow-hidden hidden md:block">
                {assignments.map(a => (
                    <CalendarDayAssignment
                        key={a.id}
                        assignment={a}
                        color={getClassColor(a.classId)}
                        onClick={onAssignmentClick}
                    />
                ))}

                {events.length > 0 && assignments.length > 0 && <div className="h-0.5"></div>}

                {events.map(e => (
                    <CalendarDayEvent
                        key={e.id}
                        event={e}
                        onClick={onEventClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default CalendarDay;
