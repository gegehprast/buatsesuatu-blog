import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { shuffle2 } from '../../utils/array'

interface Item {
    id: number;
    url: string;
}

const items: Item[] = [...Array(24)]
    .map((item, i) => (
        {
            id: i + 1,
            url: `/images/jigsaw/image_part_0${(i + 1).toString().length > 1 ? i + 1 : '0' + (i + 1)}.png`
        }
    ))

const Jigsaw = (): JSX.Element => {
    const [images, setImages] = useState<Item[]>([])
    const [anchorImage, setAnchorImage] = useState<Item>()
    
    useEffect(() => {
        const anchorIndex = Math.floor(Math.random() * items.length)
        const images = shuffle2(items, [anchorIndex])

        setAnchorImage(items[anchorIndex])
        setImages(images)
    }, [])
    
    return <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <div className="grid grid-cols-4 gap-0 aspect-[1080/1620] max-h-[90vh] w-full">
            {images.map(item => <div key={item.id} className="aspect-square">
                <Picture images={images} imageId={item.id} canDragDrop={item.id !== anchorImage.id} />
            </div>)}
        </div>
    </DndProvider>
}

const Picture = ({ images, imageId, canDragDrop }: { images: Item[], imageId: number, canDragDrop: boolean }): JSX.Element => {
    const imageIdRef = useRef(imageId)
    
    const [{ isDragging }, drag] = useDrag<{ id: number }, { id: number }, { isDragging: boolean; canDrag: boolean }>(() => ({
        type: 'IMAGE',
        canDrag: canDragDrop,
        item: () => ({ id: imageIdRef.current }),
        end: (draggedItem, monitor) => {
            if (monitor.didDrop()) {
                imageIdRef.current = monitor.getDropResult().id
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            canDrag: monitor.canDrag(),
        })
    }), [images, imageId, canDragDrop])

    const [{ hovered }, drop] = useDrop<{ id: number }, { id: number }, { hovered: boolean; canDrop: boolean }>(() => ({
        accept: 'IMAGE',
        canDrop: () => canDragDrop,
        drop: (DragObject) => {
            const lastImageId = imageIdRef.current

            imageIdRef.current = DragObject.id

            return { id: lastImageId }
        },
        collect: (monitor) => ({
            hovered: monitor.isOver() && imageIdRef.current !== monitor.getItem().id,
            canDrop: monitor.canDrop(),
        })
    }), [images, imageId, canDragDrop])

    let hoveredStyle = hovered ? 'border-8 border-green-500 cursor-move' : 'border-0 cursor-move'
    let draggedStyle = isDragging ? 'border-8 border-blue-500 cursor-move' : 'border-0 cursor-move'

    if (!canDragDrop) {
        hoveredStyle = draggedStyle = 'border-4 border-pink-500 cursor-not-allowed'
    }

    return <div ref={drop} className={hoveredStyle}>
        <div ref={drag} className={draggedStyle}>
            <Image src={images[imageIdRef.current - 1].url} 
                width={270} 
                height={270} 
                layout="responsive" 
                alt={`image ${images[imageIdRef.current - 1].id}`}
            />
        </div>
    </div>
}

export default Jigsaw
