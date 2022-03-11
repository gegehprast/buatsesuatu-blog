import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { DndProvider, } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import Board from './Board'
import { Game } from './Game/Game'
import { Observer } from './Type'

const Container: React.FC = () => {
    const game = useMemo(() => new Game(), [])
    const [levelIndex, setLevelIndex] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        game.observe(observer)
    })
    

    const observer: Observer = (game: Game) => {
        setIsComplete(game.level.isCompleted)
        setLevelIndex(game.levelIndex)
    }

    const changeLevel = (op: number) => {
        const next = levelIndex + op

        if (next < 0) return

        if (next >= game.levels.length) return

        game.toLevel(next)
    }
    
    return <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <div className='relative w-full mt-2'>
            {game && <Board game={game} />}

            {game && <div className={`aspect-[1080/1620] max-h-[85vh] w-full content-start absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isComplete ? 'z-50' : 'hidden'}`}>
                <Image src={game.level.completePictureUrl} 
                    width={1080} 
                    height={1620} 
                    layout="responsive" 
                    alt={`image ${game.level.completePictureUrl}`}
                />
            </div>}
        </div>

        {(game && isComplete) && <div className='items-center w-full mt-1 leading-none text-center text-white'>
            <div className='flex items-center justify-center w-full mx-auto md:w-2/12'>
                <button className='px-2 py-1 text-xs bg-blue-600 border border-blue-500 rounded hover:bg-blue-500' onClick={() => changeLevel(1)}>Next Level</button>
            </div>
        </div>}

        {game && <div className='items-center w-full mt-1 leading-none text-center text-white'>
            <div className='flex items-center justify-center w-full mx-auto md:w-2/12'>
                <button className='px-2 py-1 text-xs bg-blue-600 border border-blue-500 rounded hover:bg-blue-500' onClick={() => game.completeLevel()}>Set Complete</button>
            </div>
        </div>}
    </DndProvider>
}

export default Container
