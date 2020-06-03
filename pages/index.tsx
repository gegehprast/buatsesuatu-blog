import Head from 'next/head'

export default function Home():JSX.Element {

    return (
        <div className="container">
            <Head>
                <title>Hello</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <main>
                <h1 className="title">
                    Hello
                </h1>
            </main>
        </div>
    )
}

