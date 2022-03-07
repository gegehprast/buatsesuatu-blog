import Header from './Header'
import Footer from './Footer'
import { LoadingProgressProvider } from '../Context/LoadingProgress'
import FloatingMenu from '../FloatingMenu'
import { AuthProvider } from '../Context/AuthContext'
import { useState, useEffect } from 'react'
import ToTop from '../ToTop'
import HeadTag from './HeadTag'

interface Props {
    children: React.ReactNode
}

const SiteLayout = ({ children }: Props): JSX.Element => {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const isDarkMode = window.localStorage.getItem('ISDARKMODE')

        setDarkMode(isDarkMode === '1')
    }, [])

    const handleDarkMode = () => {
        window.localStorage.setItem('ISDARKMODE', darkMode ? '0' : '1')
        setDarkMode(!darkMode)
    }

    return (
        <>
            <HeadTag />

            <div className={`${darkMode && 'dark-mode'}`}>
                <AuthProvider>
                    <LoadingProgressProvider>
                        <Header darkMode={darkMode} setDarkMode={handleDarkMode} />

                        <div className="min-h-80-screen">
                            {children}
                        </div>

                        <Footer />

                        <FloatingMenu />
                    </LoadingProgressProvider>
                </AuthProvider>

                <ToTop />
            </div>
        </>
    )
}

export const getLayout = (page: JSX.Element): JSX.Element => {
    return (
        <SiteLayout>{page}</SiteLayout>
    )
}

export default SiteLayout