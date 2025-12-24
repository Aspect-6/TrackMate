import React from 'react'
import { useApp } from '@/app/contexts/AppContext'
import type { TermSettings } from '@/pages/Settings/types'
import { SETTINGS, GLOBAL } from '@/app/styles/colors'

const NoTermsYetButton: React.FC<TermSettings.Content.NoTermsYetButtonProps> = ({ children }) => {
    const { openModal } = useApp()

    return (
        <button
            onClick={() => openModal('add-term')}
            className="w-full text-center py-8 text-sm border-2 border-dashed rounded-xl transition-colors cursor-pointer term-empty-state"
            style={{ borderColor: SETTINGS.CARD_BORDER, color: GLOBAL.TEXT_SECONDARY }}
        >
            {children}
        </button>
    )
}

export default NoTermsYetButton
