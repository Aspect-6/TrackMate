import React from 'react';
import { Trash2 } from 'lucide-react';
import { DangerZoneProps } from '@/pages/Settings/types';
import { SETTINGS } from '@/app/styles/colors';

const DangerZone: React.FC<DangerZoneProps> = ({ onOpenClearDataModal }) => {
    return (
        <div
            className="p-6 rounded-xl"
            style={{
                backgroundColor: SETTINGS.MODULE_BG,
                border: `1px solid ${SETTINGS.MODULE_BORDER}`,
                boxShadow: SETTINGS.MODULE_SHADOW,
            }}
        >
            <h2 className="text-xl font-bold mb-4" style={{ color: SETTINGS.TEXT_DANGER }}>Danger Zone</h2>
            <p className="mb-6" style={{ color: SETTINGS.BODY_TEXT }}>
                This action will permanently delete all your assignments, classes, events, and schedule data.
                This cannot be undone.
            </p>
            <button
                onClick={onOpenClearDataModal}
                className="flex items-center py-2 px-4 settings-button-danger rounded-lg font-medium"
            >
                <Trash2 className="w-5 h-5 mr-2" />
                Clear All Data
            </button>
        </div>
    );
};

export default DangerZone;
