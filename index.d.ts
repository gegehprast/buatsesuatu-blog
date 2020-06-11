interface Article {
    _id?: string
    slug: string
    title: string
    cover?: string
    caption?: string
    desc: string
    content: string
    tags?: string[]
    status?: 'published' | 'preview'
    author?: {
        username: string
        name: string
    }
}

type onSuccess = (res: AxiosResponse) => void

type onError = (e: any) => void
