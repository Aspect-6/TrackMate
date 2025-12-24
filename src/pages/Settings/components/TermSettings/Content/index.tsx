import React from 'react'

interface Props {
    children: React.ReactNode
}

const TermSettingsContent: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex flex-col gap-4">
            {children}
        </div>
    )
}

export default TermSettingsContent
