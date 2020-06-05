import Head from 'next/head'
import Header from '../Header'

interface Props {
    children: React.FC | React.ReactElement
}

const SiteLayout: React.FC<Props> = ({ children }) => {
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

export const getLayout: React.FC<React.FC> = (page: React.FC) => {
    return (
        <SiteLayout>{page}</SiteLayout>
    )
}

export default SiteLayout