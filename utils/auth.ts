import Axios, { AxiosResponse, CancelToken } from 'axios'
import cookie from 'js-cookie'

interface LoginParams {
    username: string
    password: string
}

interface LoginReturn {
    token: string | null
    token_life: number | null
    expires: string | null
}

export const login = ({ username, password }: LoginParams): Promise<LoginReturn> => {
    return new Promise(resolve => {
        Axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API_HOST}/auth/login`,
            data: { username, password }
        }).then((res: AxiosResponse) => {
            resolve(res.data)
        }).catch(() => {
            resolve({
                token: null,
                token_life: null,
                expires: null,
            })
        })
    })
}

interface GetUserParams {
    cancelToken?: CancelToken
    onSuccess: onSuccess
    onError: onError
}

export const getUser = ({ cancelToken, onSuccess, onError }: GetUserParams): void => {
    Axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_HOST}/auth/user`,
        cancelToken: cancelToken,
        headers: {
            Authorization: cookie.get('loggedinToken')
        }
    }).then((res: AxiosResponse) => {
        onSuccess(res)
    }).catch((e: any) => {
        if (Axios.isCancel(e)) return

        onError(e)
    })
}