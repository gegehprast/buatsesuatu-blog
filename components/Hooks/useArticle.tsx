import { useState, useEffect } from 'react'
import axios from 'axios'
import { getOneArticle } from '../../utils/articles'

interface Props {
    slug: string
    initial?: {
        article: Article
    }
}

type Error = null | { status: number, message: string }

type ArticleHook = {
    loading: boolean,
    error: Error,
    article: Article,
}

const initialArticle = {
    slug: '',
    title: '',
    desc: '',
    content: '',
}

const useArticle = ({ slug, initial }: Props): ArticleHook => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error>(null)
    const [article, setArticle] = useState<Article>(initial ? initial.article : initialArticle)

    useEffect(() => {
        let cancel: () => void

        setLoading(true)

        setError(null)

        getOneArticle({
            slug,
            cancelToken: new axios.CancelToken(c => cancel = c),
            onSuccess: (res) => {
                setArticle(res.data)

                setTimeout(() => {
                    setLoading(false)
                }, 200)
            },
            onError: (e) => {
                setLoading(false)

                setError({
                    status: e.response.status,
                    message: e.message,
                })
            }
        })

        return () => cancel()
    }, [slug])

    return {
        loading,
        error,
        article,
    }
}

export default useArticle
