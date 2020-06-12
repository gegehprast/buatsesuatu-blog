import React from 'react'
import Link from 'next/link'

interface Props {
    length: number
    tag: string
    i: number
}

const Tag = ({ length, tag, i }: Props): JSX.Element => {
    return (
        <Link href={{ pathname: '/', query: { tags: tag } }} as={`/?tags=${tag}`} shallow={true} >
            <a className={`inline-block px-3 py-1 ${(i < length) && 'mr-2'} my-1 text-sm font-semibold text-gray-700 hover:bg-gray-400 bg-gray-200 rounded-full`}>
                #{tag}
            </a>
        </Link>
    )
}

export default Tag
