import React, { useState, useContext, useEffect } from 'react'
import { updateArticle, getOneArticle } from '../../../utils/articles'
import { AuthContext } from '../../../components/Context/AuthContext'
import { useRouter } from 'next/dist/client/router'
import useArticle from '../../../components/Hooks/useArticle'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import ArticleForm from '../../../components/ArticleForm'

interface Props {
    initial: {
        article: Article
    }
}

const Create = ({ initial }: Props): React.ReactElement | null => {
    const { fetching, loggedIn, user } = useContext(AuthContext)
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [cover, setCover] = useState('')
    const [caption, setCaption] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState('')
    const [status, setStatus] = useState<'published' | 'preview'>('preview')
    const [submitting, setSubmitting] = useState(false)
    const { article, loading } = useArticle({ slug: router.query.slug as string, initial })

    useEffect(() => {
        if (!loading) {
            setTitle(article.title || '')
            setDesc(article.desc || '')
            setCover(article.cover || '')
            setCaption(article.caption || '')
            setContent(article.content || '')
            setTags(article.tags && article.tags.join(',') || '')
            setStatus(article.status || 'preview')
        }
    }, [article, loading])

    useEffect(() => {
        if (!fetching && (!loggedIn || !user)) {
            router.push('/', '/', { shallow: true })
        }
    }, [fetching, loggedIn, router, user])

    const handleContentChange = (value: string) => {
        setContent(value)
    }

    const handleUpdateArticle = async () => {
        setSubmitting(true)

        try {
            await updateArticle({ id: article._id as string, title, desc, cover, caption, content, tags, status })

            alert('Berhasil memperbarui postingan!')

            setSubmitting(false)
        } catch (error) {
            setSubmitting(false)
        }
    }

    if (!loggedIn || !user) {
        return null
    }

    return (
        <div className="w-full">
            <main className="p-3 mx-auto mt-3 md:w-3/4 lg:w-5/6 xl:w-1/2 xxl-1344:w-4/6 xxl-1920:w-1/2 xxl-4k:w-1/3">
                {/* Title */}
                <h1 className="px-1 text-lg font-bold leading-none">
                    Edit Postingan
                </h1>

                {/* Container */}
                <ArticleForm title={title}
                    setTitle={setTitle}
                    desc={desc}
                    setDesc={setDesc}
                    cover={cover}
                    setCover={setCover}
                    caption={caption}
                    setCaption={setCaption}
                    content={content}
                    handleContentChange={handleContentChange}
                    tags={tags}
                    setTags={setTags}
                    status={status}
                    setStatus={setStatus}
                    handleSubmit={handleUpdateArticle}
                    buttonText="Update"
                    ready={submitting}
                />
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {
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

    const initial = {
        article: res,
    }

    return { props: { initial } }
}

export default Create
