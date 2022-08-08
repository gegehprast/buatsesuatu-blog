import { ImageDimension } from "./Types"

export const fill = (
    context: CanvasRenderingContext2D,
    fillStyle: string | CanvasGradient | CanvasPattern,
    x: number,
    y: number,
    w: number,
    h: number
) => {
    context.fillStyle = fillStyle
    context.fillRect(x, y, w, h)
}

export const drawImage = async (
    context: CanvasRenderingContext2D,
    objectUrl: string,
    x: number,
    y: number,
    w: number,
    h: number
) => {
    const img = await loadImage(objectUrl)

    context.drawImage(img, x, y, w, h)
}

export const loadImage = (objectUrl: string) => new Promise<HTMLImageElement>(resolve => {
    const img = new Image()

    img.onload = () => {
        resolve(img)
    }

    img.src = objectUrl
})

export const getHeightAndWidthFromObjectUrl = async (objectUrl: string) => {
    const img = await loadImage(objectUrl)
    
    return {
        height: img.height,
        width: img.width,
    } as ImageDimension
}

export const sleep = (ms: number) => new Promise<void>(resolve => {
    setTimeout(() => {
        resolve()
    }, ms);
})
