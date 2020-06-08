interface Article {
    slug: string
    title: string
    cover: string
    desc: string
    content: string
    tags: string[]
}

type onSuccess = (res: AxiosResponse) => void

type onError = (e: any) => void
