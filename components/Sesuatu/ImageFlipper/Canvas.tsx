import React, { useEffect, useRef } from 'react'
import { fill } from './helper'

interface CanvasProps {
    width: number
    height: number
}

const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current

        if (!canvas) return

        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d')

        if (!context) return

        fill(context, '#ffffff', 0, 0, context.canvas.width, context.canvas.height)
    }, [height, width])

    return (
        <canvas ref={canvasRef}></canvas>
    )
}

export default Canvas