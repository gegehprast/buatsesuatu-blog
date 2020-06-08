import { useState, useEffect } from 'react'
import axios from 'axios'
import { getArticles } from '../../utils/articles'

interface Props {
    page: number
    limit: number
    initial: {
        articles: Article[]
        total: number
    }
}

type ArticlesHook = {
    loading: boolean
    error: boolean
    articles: Article[]
    hasMore: boolean
    total: number
    removeArticle: (id: string) => void
}

const useArticles = ({ page, limit, initial }: Props): ArticlesHook => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [articles, setArticles] = useState<Article[]>(initial.articles)
    const [hasMore, setHasMore] = useState(false)
    const [total, setTotal] = useState(initial.total)

    useEffect(() => {
        let cancel: () => void

        setLoading(true)

        setError(false)

        getArticles({
            page: page,
            limit: limit,
            cancelToken: new axios.CancelToken(c => cancel = c),
            onSuccess: (res) => {
                setArticles(res.data.docs)

                setTotal(res.data.totalDocs)

                setHasMore(res.data.totalPages > res.data.page)

                setLoading(false)
            },
            onError: () => {
                setLoading(false)

                setError(true)
            }
        })

        return () => cancel()
    }, [page])

    const removeArticle = (id: string) => {
        const newArticle = articles.filter(article => article._id !== id)

        setArticles(newArticle)
    }

    return {
        loading,
        error,
        articles,
        hasMore,
        total,
        removeArticle,
    }
}

export default useArticles
