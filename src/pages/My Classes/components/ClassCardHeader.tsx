import React from 'react';
import { Trash2, Edit2, GripVertical } from 'lucide-react';
import { ClassCardHeaderProps } from '@/pages/My Classes/types';

const ClassCardHeader: React.FC<ClassCardHeaderProps> = ({
    name,
    attributes,
    listeners,
    onEdit,
    onDelete
}) => {
    return (
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
                <div {...attributes} {...listeners} className="cursor-grab touch-none p-1 rounded grip-container">
                    <GripVertical className="w-5 h-5 class-card-icon" />
                </div>
                <h2 className="text-xl font-bold class-header-title">{name}</h2>
            </div>
            <div className="flex space-x-2 ml-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                <button
                    onClick={onEdit}
                    className="p-1 transition-colors"
                    title="Edit Class"
                >
                    <Edit2 className="w-4 h-4 class-card-icon" />
                </button>
                <button
                    onClick={onDelete}
                    className="p-1 transition-colors"
                    title="Delete Class"
                >
                    <Trash2 className="w-4 h-4 class-card-icon delete" />
                </button>
            </div>
        </div>
    );
};

export default ClassCardHeader;
