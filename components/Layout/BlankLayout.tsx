import React from 'react'
import HeadTag from './HeadTag'

const BlankLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <>
            <HeadTag />

            <div className='relative w-full min-h-screen bg-gray-500'>
                {children}
            </div>
        </>
    )
}

export default BlankLayout