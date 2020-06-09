import React, { useState, useContext, useEffect } from 'react'
import { storeArticle } from '../../utils/articles'
import { AuthContext } from '../../components/Context/AuthContext'
import { useRouter } from 'next/dist/client/router'
import ArticleForm from '../../components/ArticleForm'

const Create = (): React.ReactElement | null => {
    const { fetching, loggedIn, user } = useContext(AuthContext)
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [cover, setCover] = useState('')
    const [caption, setCaption] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState('')
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (!fetching && (!loggedIn || !user)) {
            router.push('/', '/', { shallow: true })
        }
    }, [fetching, loggedIn, user])

    const handleContentChange = (value: string) => {
        setContent(value)
    }

    const handleStoreArticle = async () => {
        setSubmitting(true)

        try {
            await storeArticle({ title, desc, cover, caption, content, tags })

            alert('Berhasil membuat postingan!')

            setSubmitting(false)
        } catch (error) {
            console.log(error)
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
                    Buat Postingan
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
                    handleSubmit={handleStoreArticle}
                    buttonText="Post"
                    ready={submitting}
                />
            </main>
        </div>
    )
}

export default Create
