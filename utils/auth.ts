import Axios, { AxiosResponse } from 'axios'

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