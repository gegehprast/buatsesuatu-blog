import React from 'react'
import { readFileSync } from 'fs'
import path from 'path'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../components/MarkdownRenderes/CodeBlock'
import { H1, H2, H3 } from '../components/MarkdownRenderes/Heading'
import Anchor from '../components/MarkdownRenderes/Anchor'

const About = ({ content }: { content: string }): JSX.Element => {
    return (
        <div className="w-full">
            <Head>
                <title key="title">Tentang | Buat Sesuatu</title>
                <meta key="og:title" property="og:title" content="Tentang | Buat Sesuatu" />
                <meta key="og:url" property="og:url" content={`${process.env.NEXT_PUBLIC_OG_URL}/about`} />
                <link key="canonical" rel="canonical" href={`${process.env.NEXT_PUBLIC_OG_URL}/about`} />
            </Head>
            
            <main className="p-3 mx-auto mt-3 md:w-3/4 lg:w-5/6 xl:w-1/2 xxl-1344:w-4/6 xxl-1920:w-1/2 xxl-4k:w-1/3">
                <div className="mt-10">
                    <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                        Tentang Buat Sesuatu
                    </h1>
                </div>

                <div className="w-full mt-8 markdown-body">
                    <ReactMarkdown skipHtml={false} components={{ code: CodeBlock, h1: H1, h2: H2, h3: H3, a: Anchor }}>
                        {content}
                    </ReactMarkdown>
                </div>
            </main>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const content = readFileSync(path.join('public/static/about.md')).toString()

    return {
        props: {
            content,
        },
    }
}

export default About
