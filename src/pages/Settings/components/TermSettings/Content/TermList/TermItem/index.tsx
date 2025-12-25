import React from 'react'
import type { TermSettings } from '@/pages/Settings/types'
import { SETTINGS } from '@/app/styles/colors'

const TermItem: React.FC<TermSettings.Content.TermList.TermItem.Props> = ({ children }) => {
    return (
        <div
            className={'p-5 rounded-xl border transition-colors'}
            style={{
                backgroundColor: SETTINGS.MODAL_BG,
                borderColor: SETTINGS.CARD_BORDER,
                color: SETTINGS.BODY_TEXT,
            }}
        >
            {children}
        </div>
    )
}

export default TermItem
