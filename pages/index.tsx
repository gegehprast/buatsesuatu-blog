import { useState, useEffect, useContext } from 'react'
import { GetServerSidePropsContext, GetServerSideProps } from 'next'
import Link from 'next/link'
import ReactPlaceholder from 'react-placeholder'
import Card from '../components/Card'
import MyPagination from '../components/Pagination'
import useArticles from '../components/Hooks/useArticles'
import { useRouter } from 'next/dist/client/router'
import { pushRouterQueries } from '../utils/util'
import { LoadingProgressContext } from '../components/Context/LoadingProgress'
import { getArticles, deleteArticle } from '../utils/articles'
import { AuthContext } from '../components/Context/AuthContext'
import CardsPlaceHolder from '../components/CardsPlaceHolder'

const limit = 12

interface Props {
    initial: {
        articles: Article[]
        total: number
        totalPage: number
    }
}

const Home = ({ initial }: Props): React.ReactElement => {
    const router = useRouter()
    const [firstTime, setFirstTime] = useState(true)
    const [page, setPage] = useState(router.query.page ? parseInt(router.query.page as string) : 1)
    const { articles, total, loading, removeArticle, totalPage } = useArticles({ page, limit, initial })
    const { setPageLoading } = useContext(LoadingProgressContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        setFirstTime(true)
    }, [initial])

    useEffect(() => {
        setPage(router.query.page ? parseInt(router.query.page as string) : 1)
    }, [router.query.page])

    useEffect(() => {
        if (!loading) {
            setPageLoading(false)
        }
    }, [loading])

    const handlePageChange = (pageNumber: number) => {
        if (page === pageNumber) {
            return
        }

        setFirstTime(false)
        setPageLoading(true)
        pushRouterQueries(router, {
            params: { page: pageNumber },
            resetScroll: true,
        })
    }

    const handleDeleteArticle = async (id: string) => {
        if (confirm('Hapus postingan ini?')) {
            const destroy = await deleteArticle(id)

            if (destroy === true) {
                removeArticle(id)
            }
        }
    }
    
    return (
        <div className="w-full">
            <main className="p-3 mx-auto mt-3 md:w-3/4 lg:w-5/6 xl:w-1/2 xxl-1344:w-4/6 xxl-1920:w-1/2 xxl-4k:w-1/3">
                {/* Title */}
                <h1 className="px-1 text-lg font-bold leading-none">
                    Postingan
                </h1>

                {/* Container */}
                <ReactPlaceholder ready={firstTime || !loading} customPlaceholder={<CardsPlaceHolder />}>
                    <div className="flex flex-wrap w-full min-h-full mt-6">
                        {articles.length < 1 && <div className="w-full mt-4 text-lg font-bold text-center">Belum ada postingan.</div>}

                        {/* Cards */}
                        {articles.map((article) => (
                            <Card key={article._id}
                                title={article.title}
                                cover={article.cover}
                                text={article.desc}
                                tags={article.tags}
                                link={{ href: '/articles/[slug]', as: `/articles/${article.slug}` }}
                            >
                                <div className="bg-gray-500">
                                    {user && <div className="p-2">
                                        <div className="flex">
                                            <Link href="/articles/[slug]/edit" as={`/articles/${article.slug}/edit`}>
                                                <a className="p-2 leading-none text-white bg-indigo-500 rounded hover:bg-indigo-600 active:bg-indigo-700">Edit</a>
                                            </Link>
                                            <button className="p-2 ml-2 leading-none text-white bg-red-600 rounded hover:bg-red-700 active:bg-red-500" onClick={() => handleDeleteArticle(article._id as string)}>Delete</button>
                                        </div>
                                    </div>}
                                </div>
                            </Card>
                        ))}
                    </div>
                </ReactPlaceholder>

                {/* Secondary container */}
                {totalPage > 1 && <div className="flex flex-wrap w-full min-h-full mt-6">
                    <MyPagination onChange={handlePageChange} totalItemsCount={total} activePage={page} itemsCountPerPage={limit} />
                </div>}
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
        totalPage: res.totalPages
    }

    return { props: { initial } }
}

export default Home
