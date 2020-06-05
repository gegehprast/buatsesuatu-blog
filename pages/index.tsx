import Head from 'next/head'
import Card from '../components/Card'
import MyPagination from '../components/Pagination'
import useArticle from '../components/Hooks/useArticle'
import { useState } from 'react'

const Home: React.FC = () => {
    const [page, setPage] = useState(1)
    const { articles, loading, total } = useArticle({ page })

    console.log({ articles, loading, total })

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber)
    }
    
    return (
        <div className="w-full">
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="p-3 mx-auto mt-3 md:w-3/4 lg:w-5/6 xl:w-1/2 xxl-1344:w-4/6 xxl-1920:w-1/2 xxl-4k:w-1/3">
                {/* Title */}
                <h1 className="px-1 text-lg font-bold leading-none">
                    Postingan
                </h1>

                {/* Container */}
                {!loading && <div className="flex flex-wrap min-h-full mt-6 w-100">
                    {/* Cards */}
                    {articles.map((article, i) => (
                        <Card key={i} title={article.title} cover={article.cover} text={article.text} tags={article.tags} />
                    ))}
                </div>}
                
                {/* Secondary container */}
                <div className="flex flex-wrap min-h-full mt-6 w-100">
                    <MyPagination onChange={handlePageChange} totalItemsCount={total} activePage={page} itemsCountPerPage={6} />
                </div>
            </main>
        </div>
    )
}

export default Home
