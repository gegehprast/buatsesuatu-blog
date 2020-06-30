import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/dist/client/router'
import useArticle from '../../components/Hooks/useArticle'
import { handleImageError } from '../../utils/util'
import CodeBlock from '../../components/MarkdownRenderes/CodeBlock'
import ArticlePlaceHolder from '../../components/ArticlePlaceholder'
import ReactPlaceholder from 'react-placeholder/lib'
import Heading from '../../components/MarkdownRenderes/Heading'
import Anchor from '../../components/MarkdownRenderes/Anchor'
import { DiscussionEmbed } from 'disqus-react'
import Head from 'next/head'
import Tag from '../../components/Tag'
import { NextPage } from 'next'
import { getOneArticle } from '../../utils/articles'

interface Props {
    initial?: {
        article: Article
    }
}

const Article: NextPage<Props> = ({ initial }) => {
    const router = useRouter()
    const { article, loading } = useArticle({ slug: router.query.slug as string, initial })

    if (!loading && article.status === 'preview') {
        router.push('/', '/', { shallow: true })
    }
 
    return (
        <div className="w-full">
            <Head>
                <title key="title">{article.title} | Buat Sesuatu</title>
                <meta key="description" name="description" content={article.desc} />
                {article.tags && <meta key="keywords" name="keywords" content={article.tags.join(',')} />}
                {article.author && <meta key="author" name="author" content={article.author.name} />}
                <meta key="og:type" property="og:type" content="article" />
                <meta key="og:image" property="og:image" content={article.cover} />
                <meta key="og:image:alt" property="og:image:alt" content={article.caption} />
                <meta key="og:title" property="og:title" content={`${article.title} | Buat Sesuatu`} />
                <meta key="og:description" property="og:description" content={article.desc} />
                <meta key="og:url" property="og:url" content={`${process.env.NEXT_PUBLIC_OG_URL}/articles/${article.slug}`} />
                <link key="canonical" rel="canonical" href={`${process.env.NEXT_PUBLIC_OG_URL}/articles/${article.slug}`} />
            </Head>
            <main className="p-3 mx-auto mt-3 md:w-3/4 lg:w-5/6 xl:w-1/2 xxl-1344:w-4/6 xxl-1920:w-1/2 xxl-4k:w-1/3">
                {/* Container */}
                <ReactPlaceholder ready={!loading} customPlaceholder={<ArticlePlaceHolder />}>
                    <>
                    </>
                </ReactPlaceholder>

                <div className={`flex flex-col flex-wrap w-full px-1 ${loading && 'hidden'}`}>
                    <figure>
                        <div className="relative w-full min-h-full h-210-px md:h-480-px">
                            {loading ?
                                <img className="absolute object-cover w-full h-full bg-white" src='/logo-fit.png' alt={article.title} onError={handleImageError} /> :
                                <img className="absolute object-cover w-full h-full bg-white" src={article.cover} alt={article.title} onError={handleImageError} />
                            }

                            <div className="absolute object-cover w-full h-full bg-black opacity-0" />
                        </div>
                        {article.caption && <figcaption className="text-sm text-center text-gray-700">
                            <ReactMarkdown renderers={{ code: CodeBlock, heading: Heading, link: Anchor }}>
                                {article.caption}
                            </ReactMarkdown>
                        </figcaption>}
                    </figure>

                    <div className="mt-10">
                        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                            {article.title}
                        </h1>
                    </div>

                    <div className="w-full mt-8 markdown-body">
                        <ReactMarkdown renderers={{ code: CodeBlock, heading: Heading, link: Anchor }}>
                            {article.content}
                        </ReactMarkdown>
                    </div>

                    <div className="flex items-center mt-10">
                        <div className="mr-4 font-semibold">Tags: </div>
                        <div className="flex flex-wrap">
                            {article.tags && article.tags.map((tag, i) => (
                                <Tag key={i} length={(article.tags as string[]).length} tag={tag} i={i} />
                            ))}
                        </div>
                    </div>

                    <div className="w-full mt-24 mb-10">
                        {
                            !loading && <DiscussionEmbed key={article._id} 
                                shortname="buat-sesuatu"
                                config={
                                    {
                                        url: `https://buatsesuatu.dev/article/${article.slug}`,
                                        identifier: article._id + article.slug,
                                        title: article.title,
                                    }
                                }
                            />
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

Article.getInitialProps = async ({ req, query }) => {
    let initial = undefined

    if (req) {
        const res: any = await new Promise(resolve => {
            getOneArticle({
                slug: query.slug as string,
                onSuccess: (res) => {
                    resolve(res.data)
                },
                onError: () => {
                    resolve({})
                }
            })
        })

        initial = {
            article: res,
        }
    }
    

    return { initial: initial }
}

export default Article
