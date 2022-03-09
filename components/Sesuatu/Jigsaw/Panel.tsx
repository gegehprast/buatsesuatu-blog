import Image from 'next/image'
import React from 'react'
import { DragPreviewImage, useDrag, useDrop } from 'react-dnd'
import LockClosed from '../../Icons/LockClosed'
import type { Game } from './Game/Game'

const Panel = ({ game, index, playSwapSFX }: { game: Game, index: number, playSwapSFX: () => void }): JSX.Element => {
    const canDragDrop = index !== game.level.anchorIndex
    const piece = game.level.pieces[index]
    
    const [{ isDragging }, drag, preview] = useDrag<{ index: number }, { index: number }, { isDragging: boolean; canDrag: boolean }>(() => ({
        type: 'IMAGE',
        canDrag: canDragDrop,
        item: () => ({ index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            canDrag: monitor.canDrag(),
        })
    }), [game.level.pieces, canDragDrop])

    const [{ hovered }, drop] = useDrop<{ index: number }, { index: number }, { hovered: boolean; canDrop: boolean }>(() => ({
        accept: 'IMAGE',
        canDrop: () => canDragDrop,
        drop: (DragObject) => {
            game.move(DragObject.index, index)

            playSwapSFX()

            return { index }
        },
        collect: (monitor) => ({
            hovered: monitor.isOver() && index !== monitor.getItem().index,
            canDrop: monitor.canDrop(),
        })
    }), [game.level.pieces, canDragDrop])

    let hoveredStyle = hovered ? 'border-4 md:border-8 border-green-500 cursor-move' : 'border-0 cursor-move'
    let draggedStyle = isDragging ? 'border-4 md:border-8 border-blue-500 cursor-move' : 'border-0 cursor-move'

    if (!canDragDrop) {
        hoveredStyle = draggedStyle = 'border-0 cursor-not-allowed'
    }

    return <>
        <div ref={drop} className={hoveredStyle}>
            <DragPreviewImage connect={preview} src={piece.url} />
            
            <div ref={drag} className={`relative ${draggedStyle}`}>
                <Image src={piece.url} 
                    width={270} 
                    height={270} 
                    layout="responsive" 
                    alt={`image ${piece.id}`}
                    className={`${piece.correct ? '' : (canDragDrop ? 'grayscale' : 'grayscale-0')} ${isDragging ? 'opacity-40' : 'opacity-100'}`}
                />

                {!canDragDrop && <div className='absolute top-0 left-0 z-10 w-full h-full'>
                    <div className='absolute w-5 h-5 text-pink-500 md:w-10 md:h-10 right-1 top-1 '>
                        <LockClosed />
                    </div>    
                </div>}
            </div>
        </div>
    </>
}

export default Panel
