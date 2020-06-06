import { NextApiRequest, NextApiResponse } from 'next'
import articles from '../../mocks/articles'

type Index = (req: NextApiRequest, res: NextApiResponse) => void

const index: Index = (req: NextApiRequest, res: NextApiResponse) => {
    const perPage = 6
    const activePage = req.query.page ? parseInt(req.query.page as string) : 1
    const total = articles.length
    const from = (activePage - 1) * perPage
    const to = from + perPage
    const sliced = articles.slice(from, to)
    const totalPage = Math.ceil(total / perPage)

    const data = {
        total,
        totalPage,
        perPage,
        activePage,
        data: sliced,
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}

export default index
