import React, { useEffect, useRef, useState } from 'react'
import { fill, loadImage } from './helper'
import { I_Image } from './Types'

interface FlipperProps {
    images: I_Image[]
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
};

const Flipper: React.FC<FlipperProps> = ({ images }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        async function flip() {
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
                
                const link = document.createElement('a')
                link.download = image.file.name
                link.href = canvas.toDataURL()
                link.target = '_blank'
                link.click()
                link.remove()
            }
        }

        flip()
    }, [images])

    return (
        <canvas className='w-full' ref={canvasRef}></canvas>
    )
}

export default Flipper
