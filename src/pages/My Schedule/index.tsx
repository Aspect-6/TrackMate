import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { DayType } from '@/app/types';
import { MY_SCHEDULE } from '@/app/styles/colors';
import DaySchedule from '@/pages/My Schedule/components/DaySchedule';
import './index.css';

const Schedule: React.FC = () => {
    const { schedule, getClassById, openModal, updateSchedule } = useApp();

    const handleRemove = (dayType: NonNullable<DayType>, index: number) => {
        updateSchedule(dayType, index, null);
    };

    const handleSelect = (dayType: NonNullable<DayType>, index: number) => {
        openModal('schedule-class-selector', { dayType, index });
    };

    return (
        <div
            className="p-6 rounded-xl min-h-[60vh]"
            style={{
                backgroundColor: MY_SCHEDULE.MODULE_BG,
                border: '1px solid #30363d',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
            }}
        >
            <div className="space-y-6">
                <DaySchedule
                    title="A-Day Classes"
                    dayType="A"
                    scheduleIds={schedule.aDay}
                    getClassById={getClassById}
                    onRemove={handleRemove}
                    onSelect={handleSelect}
                />
                <DaySchedule
                    title="B-Day Classes"
                    dayType="B"
                    scheduleIds={schedule.bDay}
                    getClassById={getClassById}
                    onRemove={handleRemove}
                    onSelect={handleSelect}
                />
            </div>
        </div>
    );
};

export default Schedule;
