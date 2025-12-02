import React, { useEffect, useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import AssignmentColumn from '@/pages/My Assignments/components/AssignmentColumn';
import '@/pages/My Assignments/index.css';
import { Status } from '@/app/types';
import {
    DndContext,
    DragOverlay,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragStartEvent,
    DragCancelEvent,
    DragOverEvent
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { formatDate } from '@/app/lib/utils';
import { MY_ASSIGNMENTS } from '@/app/styles/colors';
import { GripVertical } from 'lucide-react';

const MOBILE_BREAKPOINT = '(max-width: 1023px)';

const createMobileColumnState = (): Record<Status, boolean> => ({
    'To Do': true,
    'In Progress': false,
    'Done': false,
});

const createDesktopColumnState = (): Record<Status, boolean> => ({
    'To Do': true,
    'In Progress': true,
    'Done': true,
});

const columnConfigs: { status: Status; title: string }[] = [
    { status: 'To Do', title: 'Upcoming' },
    { status: 'In Progress', title: 'In Progress' },
    { status: 'Done', title: 'Done' }
];

const columnIds = columnConfigs.map(c => c.status);

const Assignments: React.FC = () => {
    const { assignments, updateAssignment, getClassById, openModal } = useApp();
    const [isMobile, setIsMobile] = useState(false);
    const [openColumns, setOpenColumns] = useState<Record<Status, boolean>>(createMobileColumnState());
    const [activeAssignmentId, setActiveAssignmentId] = useState<string | null>(null);
    const [overId, setOverId] = useState<string | null>(null);

    const dragEnabled = !isMobile;

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        if (!dragEnabled) return;
        const { active } = event;
        setActiveAssignmentId(active.id as string);
        setOverId(null);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        if (!dragEnabled) return;
        const { active, over } = event;
        setActiveAssignmentId(null);
        setOverId(null);
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        if (activeId === overId) return;

        const activeAssignment = assignments.find(a => a.id === activeId);
        if (!activeAssignment) return;

        const overAssignment = assignments.find(a => a.id === overId);
        const overStatus = overAssignment
            ? overAssignment.status
            : (columnIds.includes(overId as Status) ? (overId as Status) : null);

        if (!overStatus) return;

        if (activeAssignment.status !== overStatus) {
            updateAssignment(activeId, { status: overStatus });
        }
    };

    const handleDragCancel = (_event: DragCancelEvent) => {
        if (!dragEnabled) return;
        setActiveAssignmentId(null);
        setOverId(null);
    };

    const handleDragOver = (event: DragOverEvent) => {
        if (!dragEnabled) return;
        const { over } = event;
        setOverId(over ? (over.id as string) : null);
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
        const applyMatch = (matches: boolean) => setIsMobile(matches);

        applyMatch(mediaQuery.matches);
        const handleChange = (event: MediaQueryListEvent) => applyMatch(event.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        setOpenColumns(isMobile ? createMobileColumnState() : createDesktopColumnState());
    }, [isMobile]);

    useEffect(() => {
        if (!dragEnabled) {
            setActiveAssignmentId(null);
            setOverId(null);
        }
    }, [dragEnabled]);

    const toggleColumn = (status: Status) => {
        if (!isMobile) return;
        setOpenColumns(prev => ({
            ...prev,
            [status]: !prev[status]
        }));
    };

    return (
        <div className="my-assignments-page flex-1 min-h-0 flex flex-col">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
                onDragOver={handleDragOver}
            >
                <div className="assignments-column-layout flex-1 min-h-0 flex flex-col lg:flex-row gap-4 overflow-x-auto pb-4 lg:pb-0">
                    {columnConfigs.map(({ status, title }) => (
                        <AssignmentColumn
                            key={status}
                            status={status}
                            title={title}
                            assignments={assignments}
                            onAssignmentClick={(id) => openModal('edit-assignment', id)}
                            getClassById={getClassById}
                            isMobile={isMobile}
                            isCollapsed={isMobile ? !openColumns[status] : false}
                            onToggleCollapse={() => toggleColumn(status)}
                            activeId={activeAssignmentId}
                            overId={overId}
                            dragEnabled={dragEnabled}
                        />
                    ))}
                </div>

                <DragOverlay>
                    {dragEnabled && activeAssignmentId ? (
                        <AssignmentDragOverlay
                            assignmentId={activeAssignmentId}
                            getClassById={getClassById}
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};

type DragOverlayProps = {
    assignmentId: string;
    getClassById: (id: string) => { id: string; name: string; color: string } | undefined;
};

const AssignmentDragOverlay: React.FC<DragOverlayProps> = ({ assignmentId, getClassById }) => {
    const assignment = useApp().assignments.find(a => a.id === assignmentId);
    const linkedClass = assignment?.classId ? getClassById(assignment.classId) : undefined;

    if (!assignment) return null;

    const classColor = linkedClass ? linkedClass.color : MY_ASSIGNMENTS.TEXT_MUTED;
    const className = linkedClass ? linkedClass.name : 'Unassigned';

    return (
        <div
            className="assignments-item p-4 rounded-lg border border-l-4 bg-[var(--card-bg)] shadow-lg flex gap-3"
            style={{
                borderColor: MY_ASSIGNMENTS.BORDER_PRIMARY,
                borderLeftWidth: '4px',
                borderLeftColor: classColor,
                color: MY_ASSIGNMENTS.ITEM_TEXT,
                boxShadow: MY_ASSIGNMENTS.ITEM_SHADOW,
                '--card-bg': MY_ASSIGNMENTS.ITEM_BG,
                '--card-hover-bg': MY_ASSIGNMENTS.ITEM_HOVER_BG,
                pointerEvents: 'none',
                opacity: 0.9,
            } as React.CSSProperties}
        >
            <div className="flex items-center justify-center text-gray-600" style={{ color: MY_ASSIGNMENTS.ITEM_SUBTEXT }}>
                <GripVertical size={16} />
            </div>
            <div className="flex-grow">
                <p className="font-semibold text-sm mb-1">{assignment.title}</p>
                <p className="text-xs mb-2" style={{ color: classColor, fontWeight: 600 }}>{className}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xs font-medium" style={{ color: MY_ASSIGNMENTS.ITEM_SUBTEXT }}>Due: {formatDate(assignment.dueDate)}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border"
                        style={{
                            backgroundColor: MY_ASSIGNMENTS.PRIORITY_MEDIUM_BG,
                            borderColor: MY_ASSIGNMENTS.PRIORITY_MEDIUM_BORDER,
                            color: MY_ASSIGNMENTS.PRIORITY_MEDIUM_TEXT,
                        }}
                    >
                        {assignment.priority}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Assignments;
