import SiteLayout from '../components/Layout/SiteLayout'
import { AppProps } from 'next/app'
import { NextComponentType } from 'next'
import '../styles/inter.css'
import '../styles/main.css'

type MyNextComponentType = NextComponentType & {
    getLayout?: (page: JSX.Element) => JSX.Element
}

type ComponentProps = AppProps & {
    Component?: MyNextComponentType
}

const MyApp = ({ Component, pageProps }: ComponentProps): JSX.Element => {
    const getLayout = Component.getLayout || ((page: JSX.Element) => <SiteLayout>{page}</SiteLayout>)

    return getLayout(<Component {...pageProps} />)
}

export default MyApp
