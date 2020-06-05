import { useState, useEffect } from 'react'
import axios from 'axios'

interface Article {
    title: string
    cover: string
    text: string
    tags: string[]
}

interface Props {
    page: number
}

interface IArticleHook {
    loading: boolean
    error: boolean
    articles: Article[]
    hasMore: boolean
    total: number
}

type Hook = (props: Props) => IArticleHook

const useArticle: Hook = ({ page }) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [articles, setArticles] = useState<Article[]>([])
    const [hasMore, setHasMore] = useState(false)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let cancel: () => void

        setLoading(true)

        setError(false)

        axios({
            method: 'GET',
            url: '/api/articles',
            params: { page },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setArticles(res.data.data)

            setTotal(res.data.total)

            setHasMore(res.data.totalPage > res.data.activePage)

            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return

            setLoading(false)

            setError(true)
        })

        return () => cancel()
    }, [page])

    return {
        loading,
        error,
        articles,
        hasMore,
        total
    }
}

export default useArticle
