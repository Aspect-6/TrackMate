import React from 'react'
import { SETTINGS } from '@/app/styles/colors'

interface Props {
    children: React.ReactNode
}

const TermSettingsComponent: React.FC<Props> = ({ children }) => {
    return (
        <div
            className="settings-card p-5 sm:p-6 rounded-xl mb-6 space-y-4"
            style={{
                backgroundColor: SETTINGS.MODULE_BG,
                border: `1px solid ${SETTINGS.MODULE_BORDER}`,
                boxShadow: SETTINGS.MODULE_SHADOW
            }}
        >
            {children}
        </div>
    )
}

export default TermSettingsComponent

export { default as TermSettingsContent } from './Content'
export { default as TermList } from './Content/TermList'
