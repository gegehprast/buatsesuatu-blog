import SiteLayout from '../components/Layout/SiteLayout'
import { AppProps } from 'next/app'
import { NextComponentType } from 'next'
import { ReactElement } from 'react'
import '../styles/inter.css'
import '../styles/main.css'

type MyNextComponentType = NextComponentType & {
    getLayout?: React.FC
}

type ComponentProps = AppProps & {
    Component?: MyNextComponentType
}

const MyApp: React.FC<ComponentProps> = ({ Component, pageProps }) => {
    const getLayout = Component.getLayout || ((page: ReactElement) => <SiteLayout>{page}</SiteLayout>)

    return getLayout(<Component {...pageProps} />)
}

export default MyApp
