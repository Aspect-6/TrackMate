import { Assignment, Status, Class } from '@/app/types';

export interface AssignmentItemProps {
    assignment: Assignment;
    onClick: (id: string) => void;
    getClassById: (id: string) => Class | undefined;
    dragEnabled: boolean;
}

export interface AssignmentColumnProps {
    status: Status;
    title: string;
    assignments: Assignment[];
    onAssignmentClick: (id: string) => void;
    getClassById: (id: string) => Class | undefined;
    isMobile: boolean;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    activeId: string | null;
    overId: string | null;
    dragEnabled: boolean;
}
