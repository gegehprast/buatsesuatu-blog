import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { shuffle2 } from '../../utils/array'
import LockClosed from '../Icons/LockClosed'

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
        <div className="grid grid-cols-4 gap-0 aspect-[1080/1620] max-h-[90vh] w-full mx-auto">
            {images.map(item => <div key={item.id} className="aspect-square drop-shadow">
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
        hoveredStyle = draggedStyle = 'border-0 cursor-not-allowed '
    }

    return <div ref={drop} className={hoveredStyle}>
        <div ref={drag} className={`relative ${draggedStyle}`}>
            <Image src={images[imageIdRef.current - 1].url} 
                width={270} 
                height={270} 
                layout="responsive" 
                alt={`image ${images[imageIdRef.current - 1].id}`}
                className={canDragDrop ? 'grayscale' : 'grayscale-0'}
            />

            {!canDragDrop && <div className='absolute top-0 left-0 z-10 w-full h-full'>
                <div className='absolute w-5 h-5 text-white md:w-10 md:h-10 right-1 top-1 drop-shadow-xl shadow-pink-500'>
                    <LockClosed/>
                </div>    
            </div>}
        </div>
    </div>
}

export default Jigsaw
