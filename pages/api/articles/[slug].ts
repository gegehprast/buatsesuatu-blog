import { NextApiRequest, NextApiResponse } from 'next'
import articles from '../../../mocks/articles'

type Index = (req: NextApiRequest, res: NextApiResponse) => void

const index: Index = (req: NextApiRequest, res: NextApiResponse) => {
    const filtered = articles.filter(article => article.slug === req.query.slug)
    const data = filtered.length > 0 ? filtered[0] : {}

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}

export default index
