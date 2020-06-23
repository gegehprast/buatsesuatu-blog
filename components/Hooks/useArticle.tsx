import { useState, useEffect } from 'react'
import axios from 'axios'
import { getOneArticle } from '../../utils/articles'

interface Props {
    slug: string
    initial?: {
        article: Article
    }
}

type ArticleHook = {
    loading: boolean,
    error: boolean,
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
    const [error, setError] = useState(false)
    const [article, setarticle] = useState<Article>(initial ? initial.article : initialArticle)

    useEffect(() => {
        let cancel: () => void

        setLoading(true)

        setError(false)

        getOneArticle({
            slug,
            cancelToken: new axios.CancelToken(c => cancel = c),
            onSuccess: (res) => {
                setarticle(res.data)

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
    }, [slug])

    return {
        loading,
        error,
        article,
    }
}

export default useArticle
