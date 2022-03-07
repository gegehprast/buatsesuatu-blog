import SiteLayout from '../components/Layout/SiteLayout'
import { AppProps } from 'next/app'
import { NextComponentType } from 'next'
import 'easymde/dist/easymde.min.css'
import 'github-markdown-css/github-markdown.css'
import 'react-placeholder/lib/reactPlaceholder.css'
import '../styles/inter.css'
import '../styles/main.css'
import '../styles/dark-mode.css'

export type MyNextComponentType = NextComponentType & {
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
