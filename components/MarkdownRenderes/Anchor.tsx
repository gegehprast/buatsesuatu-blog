import React from 'react'
import Link from 'next/link'

interface Props {
    children: string
    href?: string
}

const Anchor = (props: Props): JSX.Element => {
    if (props.href?.startsWith('https://buatsesuatu.dev/articles')) {
        const slug = props.href.replace('https://buatsesuatu.dev/articles/', '')
        
        return <Link href="/articles/[slug]" as={`/articles/${slug}`}>
            <a href={props.href} className="text-indigo-600 visited:text-purple-600 hover:text-indigo-800">
                {props.children}
            </a>
        </Link>
    }

    return <a href={props.href} className="text-indigo-600 visited:text-purple-600 hover:text-indigo-800" target="_blank" rel="noreferrer">
        {props.children}
    </a>
}

export default Anchor