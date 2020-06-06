import Axios, { AxiosResponse, CancelToken } from 'axios'

interface GetArticlesParams {
    page: number
    cancelToken?: CancelToken
    onSuccess: (res: AxiosResponse) => void
    onError: (e: any) => void
}

export const getArticles = ({ page, cancelToken, onSuccess, onError }: GetArticlesParams): void => {
    Axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_HOST}/articles`,
        params: { page },
        cancelToken: cancelToken,
    }).then((res: AxiosResponse) => {
        onSuccess(res)
    }).catch((e: any) => {
        if (Axios.isCancel(e)) return

        onError(e)
    })
}