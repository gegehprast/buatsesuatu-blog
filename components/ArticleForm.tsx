import React, { SetStateAction, Dispatch } from 'react'
import SimpleMDE from 'react-simplemde-editor'

interface Props {
    title: string
    setTitle: (value: string) => void
    desc: string
    setDesc: (value: string) => void
    cover: string
    setCover: (value: string) => void
    caption: string
    setCaption: (value: string) => void
    content: string
    handleContentChange: (value: string) => void
    tags: string
    setTags: (value: string) => void
    status: 'published' | 'preview'
    setStatus: Dispatch<SetStateAction<'published' | 'preview'>>
    buttonText: string
    ready: boolean
    handleSubmit: () => void
}

const ArticleForm = (
    { 
        title, 
        setTitle, 
        desc, 
        setDesc, 
        cover, 
        setCover, 
        caption, 
        setCaption, 
        content, 
        handleContentChange, 
        tags, 
        setTags, 
        status,
        setStatus,
        buttonText, 
        ready, 
        handleSubmit 
    }: Props): React.ReactElement => {
        
    const handleSubmitForm = (e: any) => {
        e.preventDefault()
        handleSubmit()
    }

    return (
        <div className="flex flex-wrap w-full min-h-full px-1 mt-6">
            <form className="w-full" onSubmit={handleSubmitForm}>
                <div className="flex flex-col items-center justify-start w-full mb-3">
                    <div className="w-full">
                        <label className="font-semibold leading-none">Judul</label>
                    </div>
                    <div className="flex w-full mt-1">
                        <input type="text" 
                            name="title" 
                            className="w-full p-2 text-lg leading-none border border-gray-400 rounded shadow-md" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required={true} 
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-start w-full mb-3">
                    <div className="w-full">
                        <label className="font-semibold leading-none">Deskripsi</label>
                    </div>
                    <div className="flex w-full mt-1">
                        <textarea name="desc" 
                            className="w-full p-2 text-lg leading-none border border-gray-400 rounded shadow-md resize-none" 
                            rows={4} 
                            value={desc} 
                            onChange={(e) => setDesc(e.target.value)} 
                            required={true} 
                        />
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center w-full mb-3">
                    <div className="flex flex-col items-center justify-start w-full md:pr-1 md:w-1/2">
                        <div className="w-full">
                            <label className="font-semibold leading-none">Gambar Cover</label>
                        </div>
                        <div className="flex w-full mt-1">
                            <input type="text" 
                                name="cover" 
                                className="w-full p-2 text-lg leading-none border border-gray-400 rounded shadow-md" 
                                value={cover} 
                                onChange={(e) => setCover(e.target.value)} 
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start w-full md:pl-1 md:w-1/2">
                        <div className="w-full">
                            <label className="font-semibold leading-none">Caption Gambar</label>
                        </div>
                        <div className="flex w-full mt-1">
                            <input type="text" 
                                name="cover" 
                                className="w-full p-2 text-lg leading-none border border-gray-400 rounded shadow-md" 
                                value={caption} 
                                onChange={(e) => setCaption(e.target.value)} 
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-start w-full mb-3">
                    <div className="w-full">
                        <label className="font-semibold leading-none">Konten</label>
                    </div>
                    <div className="flex w-full mt-1">
                        <SimpleMDE id="contentMarkdownEditor" 
                            onChange={handleContentChange} 
                            value={content} 
                            className="w-full rounded shadow-md" 
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-start w-full mb-3">
                    <div className="w-full">
                        <label className="font-semibold leading-none">Tags</label>
                    </div>
                    <div className="flex flex-wrap w-full mt-1">
                        <input type="text" 
                            name="tags" 
                            className="w-full p-2 text-lg leading-none border border-gray-400 rounded shadow-md" 
                            value={tags} 
                            onChange={(e) => setTags(e.target.value)} 
                        />
                        <small className="mt-1 text-xs italic text-blue-600">Pisah dengan koma (,).</small>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-start w-full mb-3">
                    <div className="w-full">
                        <label className="font-semibold leading-none">Publish</label>
                    </div>
                    <div className="flex flex-wrap w-full mt-1">
                        <div className='mr-4'>
                            <input type="radio"
                                id='published'
                                name='publish'
                                value='published'
                                onChange={() => setStatus('published')}
                                checked={status === 'published'} />

                            <label htmlFor="published" className="ml-2">
                                Yes
                            </label>
                        </div>

                        <div className='mr-4'>
                            <input type="radio"
                                id='preview' 
                                name='publish' 
                                value='preview' 
                                onChange={() => setStatus('preview')} 
                                checked={status === 'preview'} />

                            <label htmlFor="preview" className="ml-2">
                                No
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-start w-full mb-3">
                    <div className="w-full">
                        <button type="submit" 
                            className="px-4 py-3 leading-none text-white bg-indigo-700 border rounded hover:bg-indigo-800 active:bg-indigo-900"
                        >
                            {ready ? 'Tunggu sebentar...' : buttonText}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ArticleForm
