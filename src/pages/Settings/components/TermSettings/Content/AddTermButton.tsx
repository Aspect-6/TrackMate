import React from 'react'
import { useApp } from '@/app/contexts/AppContext'
import type { TermSettings } from '@/pages/Settings/types'
import { Plus } from 'lucide-react'
import { GLOBAL } from '@/app/styles/colors'

const AddTermButton: React.FC<TermSettings.Content.AddTermButtonProps> = ({ children }) => {
    const { openModal } = useApp()

    return (
        <button
            onClick={() => openModal('add-term')}
            className="w-full sm:w-auto sm:self-end inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-white transition-all"
            style={{
                backgroundColor: GLOBAL.ADDITEM_BUTTON_BG,
                '--hover-bg': GLOBAL.ADDITEM_BUTTON_BG_HOVER
            } as React.CSSProperties}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GLOBAL.ADDITEM_BUTTON_BG_HOVER)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GLOBAL.ADDITEM_BUTTON_BG)}
        >
            <Plus className="w-4 h-4" />
            {children}
        </button>
    )
}

export default AddTermButton
