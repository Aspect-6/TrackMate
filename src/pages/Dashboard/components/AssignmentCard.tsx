import React, { useState } from 'react';
import { Assignment } from '@/app/types';
import { useApp } from '@/app/context/AppContext';
import { formatDate, cn } from '@/app/lib/utils';
import { CheckCircle, Circle, Clock, PlayCircle } from 'lucide-react';
import {
    DASHBOARD
} from '@/app/styles/colors';

interface AssignmentCardProps {
    assignment: Assignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
    const { getClassById, updateAssignment, openModal } = useApp();
    const [isCompleting, setIsCompleting] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const classInfo = getClassById(assignment.classId);

    const handleAction = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (assignment.status === 'To Do') {
            updateAssignment(assignment.id, { status: 'In Progress' });
        } else if (assignment.status === 'In Progress') {
            setIsCompleting(true);
            setTimeout(() => {
                updateAssignment(assignment.id, { status: 'Done' });
                // No need to reset isCompleting as component will unmount or re-render
            }, 800);
        } else {
            updateAssignment(assignment.id, { status: 'To Do' });
        }
    };

    const getPriorityStyles = (priority: string) => {
        switch (priority) {
            case 'High': return {
                backgroundColor: DASHBOARD.PRIORITY_HIGH_BG,
                borderColor: DASHBOARD.PRIORITY_HIGH_BORDER,
                color: DASHBOARD.PRIORITY_HIGH_TEXT
            };
            case 'Medium': return {
                backgroundColor: DASHBOARD.PRIORITY_MEDIUM_BG,
                borderColor: DASHBOARD.PRIORITY_MEDIUM_BORDER,
                color: DASHBOARD.PRIORITY_MEDIUM_TEXT
            };
            case 'Low': return {
                backgroundColor: DASHBOARD.PRIORITY_LOW_BG,
                borderColor: DASHBOARD.PRIORITY_LOW_BORDER,
                color: DASHBOARD.PRIORITY_LOW_TEXT
            };
            default: return {
                backgroundColor: DASHBOARD.CARD_BG,
                borderColor: DASHBOARD.MODULE_BORDER,
                color: DASHBOARD.TEXT_GRAY_400
            };
        }
    };

    return (
        <div
            onClick={() => openModal('edit-assignment', assignment.id)}
            className="assignment-card flex flex-col gap-3 p-3 sm:p-4 rounded-xl border cursor-pointer bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] transition-colors group"
            style={{
                '--card-bg': DASHBOARD.CARD_BG,
                borderColor: DASHBOARD.MODULE_BORDER,
                borderLeftWidth: '4px',
                borderLeftStyle: 'solid',
                borderLeftColor: classInfo?.color || DASHBOARD.MODULE_BORDER,
                '--card-hover-bg': DASHBOARD.CARD_HOVER_BG
            } as React.CSSProperties}
        >
            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <button
                    onClick={handleAction}
                    className="focus:outline-none transition-colors flex-shrink-0 rounded-full border border-transparent p-1"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    title={
                        assignment.status === 'To Do' ? "Start Assignment" :
                            assignment.status === 'In Progress' ? "Complete Assignment" :
                                "Mark as Undone"
                    }
                >
                    {assignment.status === 'To Do' && (
                        <PlayCircle className="w-6 h-6" style={{ color: isHovered ? DASHBOARD.ICON_PLAY_HOVER : DASHBOARD.ICON_PLAY_DEFAULT }} />
                    )}
                    {assignment.status === 'In Progress' && !isCompleting && (
                        <Circle className="w-6 h-6" style={{ color: isHovered ? DASHBOARD.ICON_IN_PROGRESS_HOVER : DASHBOARD.ICON_IN_PROGRESS }} />
                    )}
                    {isCompleting && (
                        <CheckCircle className="w-6 h-6 scale-110 transition-transform duration-300 ease-out" style={{ color: DASHBOARD.ICON_COMPLETE }} />
                    )}
                    {assignment.status === 'Done' && (
                        <CheckCircle className="w-6 h-6" style={{ color: isHovered ? DASHBOARD.ICON_COMPLETE_HOVER : DASHBOARD.ICON_COMPLETE }} />
                    )}
                </button>

                <div className="min-w-0 flex-1">
                    <h3 className={cn(
                        "font-semibold truncate mb-1 text-base sm:text-lg",
                        assignment.status === 'Done' && "line-through"
                    )} style={{ color: assignment.status === 'Done' ? DASHBOARD.TEXT_GRAY_500 : DASHBOARD.TEXT_WHITE }}>
                        {assignment.title}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm" style={{ color: DASHBOARD.TEXT_GRAY_400 }}>
                        <span className="font-medium" style={{ color: classInfo?.color }}>
                            {classInfo?.name || 'Unknown Class'}
                        </span>
                        <div className="hidden sm:flex items-center text-sm">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDate(assignment.dueDate)}
                        </div>
                    </div>
                </div>

                <span
                    className={cn("hidden sm:inline-flex text-xs font-normal px-3 py-1 rounded-full border flex-shrink-0")}
                    style={getPriorityStyles(assignment.priority)}
                >
                    {assignment.priority}
                </span>
            </div>

            <div className="flex items-center justify-between sm:hidden gap-2">
                <div className="flex items-center gap-1 text-xs" style={{ color: DASHBOARD.TEXT_GRAY_400 }}>
                    <Clock className="w-3 h-3" />
                    {formatDate(assignment.dueDate)}
                </div>
                <span
                    className={cn("text-[11px] font-normal px-2 py-0.5 rounded-full border flex-shrink-0 self-end")}
                    style={getPriorityStyles(assignment.priority)}
                >
                    {assignment.priority}
                </span>
            </div>
        </div>
    );
};

export default AssignmentCard;
