import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

interface Props {
    length: number
    tag: string
    i: number
}

const Tag = ({ length, tag, i }: Props): JSX.Element => {
    const router = useRouter()

    const bg = router.query.tags && (router.query.tags as string).includes(tag) ? 'text-gray-100 bg-indigo-400 hover:bg-indigo-500' : 'text-gray-700 dark-text-gray-700 bg-gray-200 dark-bg-gray-200 hover:bg-gray-400'

    return (
        <Link href={{ pathname: '/', query: { tags: tag } }} as={`/?tags=${tag}`} shallow={true} >
            <a className={`inline-block px-3 py-1 ${(i < length) && 'mr-2'} my-1 text-sm font-semibold ${bg} rounded-full transition-all duration-200 ease-in`}>
                #{tag}
            </a>
        </Link>
    )
}

export default Tag
