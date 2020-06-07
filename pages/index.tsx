import Head from 'next/head'
import Card from '../components/Card'
import MyPagination from '../components/Pagination'
import useArticles from '../components/Hooks/useArticles'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/dist/client/router'
import { pushRouterQueries } from '../utils/util'
import { LoadingProgressContext } from '../components/Context/LoadingProgress'
import { getArticles } from '../utils/articles'
import { GetServerSidePropsContext, GetServerSideProps } from 'next'

const limit = 12

interface Props {
    initial: {
        articles: Article[]
        total: number
    }
}

const Home = ({ initial }: Props): React.ReactElement => {
    const router = useRouter()
    const [page, setPage] = useState(router.query.page ? parseInt(router.query.page as string) : 1)
    const { articles, total, loading } = useArticles({ page, limit, initial })
    const { setPageLoading } = useContext(LoadingProgressContext)

    useEffect(() => {
        setPage(router.query.page ? parseInt(router.query.page as string) : 1)
    }, [router.query.page])

    useEffect(() => {
        if (!loading) {
            setPageLoading(false)
        }
    }, [loading])

    const handlePageChange = (pageNumber: number) => {
        setPageLoading(true)
        pushRouterQueries(router, {
            params: { page: pageNumber },
            resetScroll: true,
        })
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
                <div className="flex flex-wrap min-h-full mt-6 w-100">
                    {/* Cards */}
                    {articles.map((article, i) => (
                        <Card key={i} 
                            title={article.title} 
                            cover={article.cover} 
                            text={article.desc} 
                            tags={article.tags} 
                            link={{ href: '/articles/[slug]', as: `/articles/${article.slug}`}} 
                        />
                    ))}
                </div>
                
                {/* Secondary container */}
                <div className="flex flex-wrap min-h-full mt-6 w-100">
                    <MyPagination onChange={handlePageChange} totalItemsCount={total} activePage={page} itemsCountPerPage={limit} />
                </div>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {
    const res: any = await new Promise(resolve => {
        getArticles({
            page: query.page ? parseInt(query.page as string) : 1,
            limit,
            onSuccess: (res) => {
                resolve(res.data)
            },
            onError: () => {
                resolve({})
            }
        })
    })

    const initial = {
        articles: res.docs,
        total: res.totalDocs,
    }

    return { props: { initial } }
}

export default Home
