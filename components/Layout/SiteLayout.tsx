import PropTypes from 'prop-types'
import Head from 'next/head'
import Header from '../Header'

const SiteLayout: React.FC = ({ children }) => {
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

SiteLayout.propTypes = {
    children: PropTypes.node,
}

export const getLayout: React.FC<React.FC> = (page: React.FC) => {
    return (
        <SiteLayout>{page}</SiteLayout>
    )
}

export default SiteLayout