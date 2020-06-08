import React, { useState, useContext, useEffect } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import { updateArticle } from '../../../utils/articles'
import { AuthContext } from '../../../components/Context/AuthContext'
import { useRouter } from 'next/dist/client/router'
import useArticle from '../../../components/Hooks/useArticle'

const Create = (): React.ReactElement | null => {
    const { fetching, loggedIn, user } = useContext(AuthContext)
    const router = useRouter()
    const [title, seTitle] = useState('')
    const [desc, seDesc] = useState('')
    const [cover, setCover] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const { article, loading } = useArticle({ slug: router.query.slug as string })

    useEffect(() => {
        if (!loading) {
            seTitle(article.title || '')
            seDesc(article.desc || '')
            setCover(article.cover || '')
            setContent(article.content || '')
            setTags(article.tags.join(',') || '')
        }
    }, [article, loading])

    useEffect(() => {
        if (!fetching && (!loggedIn || !user)) {
            router.push('/', '/', { shallow: true })
        }
    }, [fetching, loggedIn, user])

    const handleContentChange = (value: string) => {
        setContent(value)
    }

    const handleUpdateArticle = async () => {
        setSubmitting(true)

        try {
            await updateArticle({ id: article._id as string, title, desc, cover, content, tags })

            alert('Berhasil memperbarui postingan!')

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
                    Edit Postingan
                </h1>

                {/* Container */}
                <div className="flex flex-wrap w-full min-h-full px-1 mt-6">
                    <div className="flex flex-col items-center justify-start w-full mb-3">
                        <div className="w-full">
                            <label className="font-semibold leading-none">Judul</label>
                        </div>
                        <div className="flex w-full mt-1">
                            <input type="text" name="title" className="w-full p-2 text-lg leading-none border border-gray-400 rounded shadow-md" value={title} onChange={(e) => seTitle(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start w-full mb-3">
                        <div className="w-full">
                            <label className="font-semibold leading-none">Deskripsi</label>
                        </div>
                        <div className="flex w-full mt-1">
                            <textarea name="desc" className="w-full p-2 text-lg leading-none border border-gray-400 rounded shadow-md resize-none" rows={4} value={desc} onChange={(e) => seDesc(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start w-full mb-3">
                        <div className="w-full">
                            <label className="font-semibold leading-none">Gambar Cover</label>
                        </div>
                        <div className="flex w-full mt-1">
                            <input type="text" name="cover" className="w-full p-2 text-lg leading-none border border-gray-400 rounded shadow-md" value={cover} onChange={(e) => setCover(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start w-full mb-3">
                        <div className="w-full">
                            <label className="font-semibold leading-none">Konten</label>
                        </div>
                        <div className="flex w-full mt-1">
                            <SimpleMDE id="contentMarkdownEditor" onChange={handleContentChange} value={content} className="w-full rounded shadow-md" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start w-full mb-3">
                        <div className="w-full">
                            <label className="font-semibold leading-none">Tags</label>
                        </div>
                        <div className="flex flex-wrap w-full mt-1">
                            <input type="text" name="tags" className="w-full p-2 text-lg leading-none border border-gray-400 rounded shadow-md" value={tags} onChange={(e) => setTags(e.target.value)} />
                            <small className="mt-1 text-xs italic text-blue-600">Pisah dengan koma (,).</small>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start w-full mb-3">
                        <div className="w-full">
                            <button className="px-4 py-3 leading-none text-white bg-indigo-700 border rounded hover:bg-indigo-800 active:bg-indigo-900" onClick={handleUpdateArticle}>{submitting ? 'Tunggu sebentar...' : 'Update'}</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Create
