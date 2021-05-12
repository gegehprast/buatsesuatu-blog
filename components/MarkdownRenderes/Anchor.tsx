import React from 'react'
import Link from 'next/link'
import { NormalComponent, ReactBaseProps, ReactMarkdownProps } from 'react-markdown/src/ast-to-react'

type Prop = {
    href?: string
} & ReactBaseProps & ReactMarkdownProps

const Anchor: NormalComponent = ({ children, href }: Prop) => {
    if (href?.startsWith('https://buatsesuatu.dev/articles')) {
        const slug = href.replace('https://buatsesuatu.dev/articles/', '')
        
        return <Link href="/articles/[slug]" as={`/articles/${slug}`} scroll={true}>
            <a href={href} className="text-indigo-600 visited:text-purple-600 hover:text-indigo-800">
                {children}
            </a>
        </Link>
    }

    return <a href={href} className="text-indigo-600 visited:text-purple-600 hover:text-indigo-800" target="_blank" rel="noreferrer">
        {children}
    </a>
}

export default Anchor