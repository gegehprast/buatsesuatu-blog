import React, { useEffect, useRef } from 'react'
import { DndProvider, } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import Panel from './Panel'
import { Game } from './Game'

const Board = (): JSX.Element => {
    const gameRef = useRef<Game>()
    
    useEffect(() => {
        gameRef.current = new Game()
    }, [])
    
    if (!gameRef.current) {
        return null
    }
    
    return <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <div className="grid grid-cols-4 gap-0 aspect-[1080/1620] max-h-[85vh] w-full mx-auto content-start">
            {gameRef.current.pieces.map((piece, i) => <div key={i} className="aspect-square drop-shadow">
                <Panel game={gameRef.current} index={i} />
            </div>)}
        </div>
    </DndProvider>
}

export default Board
