import Axios, { AxiosResponse, CancelToken } from 'axios'

interface GetArticlesParams {
    page: number
    limit: number
    cancelToken?: CancelToken
    onSuccess: (res: AxiosResponse) => void
    onError: (e: any) => void
}

interface GetOneArticlesParams {
    slug: string
    cancelToken?: CancelToken
    onSuccess: (res: AxiosResponse) => void
    onError: (e: any) => void
}

/** Get paginated article list. */
export const getArticles = ({ page, limit, cancelToken, onSuccess, onError }: GetArticlesParams): void => {
    Axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_HOST}/articles`,
        params: { page, limit  },
        cancelToken: cancelToken,
    }).then((res: AxiosResponse) => {
        onSuccess(res)
    }).catch((e: any) => {
        if (Axios.isCancel(e)) return

        onError(e)
    })
}

/** Get one article by slug */
export const getOneArticle = ({ slug, cancelToken, onSuccess, onError }: GetOneArticlesParams): void => {
    Axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_HOST}/articles/${slug}`,
        cancelToken: cancelToken
    }).then(res => {
        onSuccess(res)
    }).catch(e => {
        if (Axios.isCancel(e)) return

        onError(e)
    })
}