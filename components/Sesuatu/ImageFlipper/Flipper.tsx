import React, { useEffect, useRef } from 'react'
import { fill, loadImage, sleep } from './helper'
import { I_Image } from './Types'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

interface FlipperProps {
    images: I_Image[]
}

interface Download {
    filename: string
    url: string
}

function flipImage(ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number, flipH = false, flipV = false) {
    const scaleH = flipH ? -1 : 1, // Set horizontal scale to -1 if flip horizontal
        scaleV = flipV ? -1 : 1, // Set verical scale to -1 if flip vertical
        posX = flipH ? width * -1 : 0, // Set x position to -100% if flip horizontal 
        posY = flipV ? height * -1 : 0; // Set y position to -100% if flip vertical

    ctx.save(); // Save the current state
    ctx.scale(scaleH, scaleV); // Set scale to flip the image
    ctx.drawImage(image, posX, posY, width, height); // draw the image
    ctx.restore(); // Restore the last saved state
}

async function download(downloads: Download[]) {
    if (downloads.length === 0) return
    
    const zip = new JSZip()
    const images = zip.folder('images')

    if (!images) return

    for (let i = 0; i < downloads.length; i++) {
        const download = downloads[i]
        
        var idx = download.url.indexOf('base64,') + ('base64,'.length)
        var content = download.url.substring(idx)
        
        images.file(download.filename, content, { base64: true })
    }
    
    zip.generateAsync({ type: 'blob' }).then(function (content) {
        saveAs(content, 'images.zip');
    })
}

const Flipper: React.FC<FlipperProps> = ({ images }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        async function flip() {
            const downloads: Download[] = []
            const canvas = canvasRef.current

            if (!canvas) return

            for (let i = 0; i < images.length; i++) {
                const image = images[i]

                canvas.width = image.width
                canvas.height = image.height

                const context = canvas.getContext('2d')

                if (!context) return

                fill(context, '#000', 0, 0, context.canvas.width, context.canvas.height)

                const img = await loadImage(image.objectUrl)

                flipImage(context, img, context.canvas.width, context.canvas.height, true)

                downloads.push({
                    filename: image.file.name,
                    url: canvas.toDataURL()
                })
            }

            download(downloads)
        }

        flip()
    }, [images])

    return (
        <canvas className='w-full' ref={canvasRef}></canvas>
    )
}

export default Flipper
