import React from 'react'

const ToTop = (): JSX.Element => {
    const handleClick = () => {
        window.scrollTo(0, 0)
    }

    return (
        <div className="fixed bottom-0 right-0 z-10 p-6" onClick={handleClick}>
            <button className="p-2 bg-white rounded" style={{ boxShadow: '0 0px 15px 0px rgba(0, 0, 0, 0.20), 0 5px 10px 0px rgba(0, 0, 0, 0.20)' }}>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M0 10a10 10 0 1 1 20 0 10 10 0 0 1-20 0zm10 8a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm.7-10.54L14.25 11l-1.41 1.41L10 9.6l-2.83 2.8L5.76 11 10 6.76l.7.7z" />
                </svg>
            </button>
        </div>
    )
}

export default ToTop
