import React from 'react'
import HeadTag from './HeadTag'

const BlankLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <>
            <HeadTag />

            <div>
                {children}
            </div>
        </>
    )
}

export default BlankLayout