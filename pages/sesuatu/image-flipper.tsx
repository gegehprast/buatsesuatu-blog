import React, { useState } from 'react'
import Head from 'next/head'
import { MyNextComponentType } from '../_app'
import BlankLayout from '../../components/Layout/BlankLayout'
import NextImage from 'next/image'
import { I_Image } from '../../components/Sesuatu/ImageFlipper/Types'
import Flipper from '../../components/Sesuatu/ImageFlipper/Flipper'
import { getHeightAndWidthFromObjectUrl } from '../../components/Sesuatu/ImageFlipper/helper'

const ImageFlipper: MyNextComponentType = () => {
    const [images, setImages] = useState<I_Image[]>([])
    
    const handleInputFilesChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        if (!event.target.files) return

        const files = Array.from(event.target.files)
        const images: I_Image[] = []

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const { width, height } = await getHeightAndWidthFromObjectUrl(URL.createObjectURL(file))
            
            images.push({
                file,
                objectUrl: URL.createObjectURL(file),
                width,
                height
            })
        }
        
        setImages(images)
    }

    const handleInputFilesClick: React.MouseEventHandler<HTMLInputElement> = (event) => {
        (event.target as HTMLInputElement).value = ''
    }

    return (
        <>
            <Head>
                <title key="title">Image Flipper</title>
            </Head>

            <div className='p-4'>
                <h1 className='text-lg font-semibold text-center text-white'>Image Flipper</h1>
            </div>

            <div className='px-4 pb-4'>
                <div className='flex flex-row w-full border rounded flex-nowrap'>
                    <div className='w-2/5 p-4 border-r'>
                        <div className='flex w-full pb-5 border-b'>
                            <input type='file'
                                multiple={true}
                                onChange={handleInputFilesChange}
                                onClick={handleInputFilesClick} />
                        </div>

                        <div className='grid w-full grid-flow-row grid-cols-6 gap-4 mt-5'>
                            {images.map((image) => (
                                <div key={image.file.name} className="relative block">
                                    <NextImage src={image.objectUrl} alt={image.file.name} layout="responsive" width={image.width} height={image.height} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='w-3/5 p-4 '>
                        <div className='overflow-hidden'>
                            <Flipper images={images} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

ImageFlipper.getLayout = (page) => {
    return (
        <BlankLayout>
            {page}
        </BlankLayout>
    )
}

export default ImageFlipper
