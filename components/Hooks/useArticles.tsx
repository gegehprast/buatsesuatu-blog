/* eslint-disable no-prototype-builtins */
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getArticles } from '../../utils/articles'

interface Props {
    page: number
    limit: number
    search: string
    tags: string
    initial: {
        articles: Article[]
        total: number
        totalPage: number
    }
}

type ArticlesHook = {
    loading: boolean
    error: boolean
    articles: Article[]
    hasMore: boolean
    total: number
    totalPage: number
    removeArticle: (id: string) => void
    updateArticle: (id: string, params: { [p: string]: string | string[] | 'published' | 'preview' }) => void
}

const useArticles = ({ page, limit, search, tags, initial }: Props): ArticlesHook => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [articles, setArticles] = useState<Article[]>(initial.articles)
    const [hasMore, setHasMore] = useState(false)
    const [total, setTotal] = useState(initial.total)
    const [totalPage, setTotalPage] = useState(initial.totalPage)

    useEffect(() => {
        let cancel: () => void

        setLoading(true)

        setError(false)

        getArticles({
            page: page,
            limit: limit,
            search: search,
            tags: tags,
            cancelToken: new axios.CancelToken(c => cancel = c),
            onSuccess: (res) => {
                setArticles(res.data.docs)

                setTotal(res.data.totalDocs)

                setTotalPage(res.data.totalPages)

                setHasMore(res.data.totalPages > res.data.page)

                setTimeout(() => {
                    setLoading(false)
                }, 200)
            },
            onError: () => {
                setLoading(false)

                setError(true)
            }
        })

        return () => cancel()
    }, [page, limit, search, tags])

    const removeArticle = (id: string) => {
        const newArticle = articles.filter(article => article._id !== id)

        setArticles(newArticle)
    }

    const updateArticle = (id: string, params: { [p: string]: string | string[] | 'published' | 'preview'}) => {
        const newArticles = [...articles]
        const index = newArticles.findIndex(article => article._id === id)

        if (index === -1) {
            return
        }

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                switch (key) {
                case 'title':
                    newArticles[index].title = params[key] as string
                    break

                case 'cover':
                    newArticles[index].cover = params[key] as string
                    break

                case 'caption':
                    newArticles[index].caption = params[key] as string
                    break

                case 'desc':
                    newArticles[index].desc = params[key] as string
                    break

                case 'tags':
                    newArticles[index].tags = params[key] as string[]
                    break

                case 'status':
                    newArticles[index].status = params[key] as 'published' | 'preview'
                    break
                }
            }
        }

        setArticles(newArticles)
    }

    return {
        loading,
        error,
        articles,
        hasMore,
        total,
        totalPage,
        removeArticle,
        updateArticle,
    }
}

export default useArticles
