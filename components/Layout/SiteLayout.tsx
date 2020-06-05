import Head from 'next/head'
import Header from '../Header'

interface Props {
    children: React.ReactNode
}

const SiteLayout = ({ children }: Props): JSX.Element => {
    return (
        <>
            <Head>
                <title key="title">Hello World</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Header />

            {children}
        </>
    )
}

export const getLayout = (page: React.ReactNode): JSX.Element => {
    return (
        <SiteLayout>{page}</SiteLayout>
    )
}

export default SiteLayout