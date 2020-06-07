import { useState, useEffect } from 'react'
import axios from 'axios'
import { getOneArticle } from '../../utils/articles'

interface Props {
    slug: string
}

type ArticleHook = {
    loading: boolean,
    error: boolean,
    article: Article,
}

const useArticle = ({ slug }: Props): ArticleHook => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [article, setarticle] = useState<Article | any>({})

    useEffect(() => {
        let cancel: () => void

        setLoading(true)

        setError(false)

        getOneArticle({
            slug,
            cancelToken: new axios.CancelToken(c => cancel = c),
            onSuccess: (res) => {
                setarticle(res.data)

                setLoading(false)
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
