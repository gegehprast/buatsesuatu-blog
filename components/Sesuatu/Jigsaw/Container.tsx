import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { DndProvider, } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import Board from './Board'
import { Game } from './Game/Game'
import { Observer } from './Type'

const Container: React.FC<{ setShowFinal: React.Dispatch<React.SetStateAction<boolean>>}> = ({ setShowFinal }) => {
    const game = useMemo(() => new Game(), [])
    const [levelIndex, setLevelIndex] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        game.observe(observer)
    })

    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false)
        }, 1000);

        return () => {
            clearTimeout(t)
        }
    }, [levelIndex])

    const observer: Observer = (game: Game) => {
        if ((game.levelIndex === game.levels.length - 1) && game.level.isCompleted) {
            setShowFinal(true)
        }
        
        setIsComplete(game.level.isCompleted)

        setLevelIndex(game.levelIndex)
    }

    const changeLevel = (op: number) => {
        const next = levelIndex + op

        if (next < 0) return

        if (next >= game.levels.length) return

        setLoading(true)

        setTimeout(() => {
            game.toLevel(next)
        }, 100);
    }
    
    return <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <div className='relative w-full mt-2'>
            {game && <Board game={game} />}

            {game && <div className={`aspect-[1080/1620] max-h-[85vh] w-full content-start absolute left-1/2 transform -translate-x-1/2 z-50 ${isComplete ? '' : 'hidden'}`}>
                <Image src={game.level.completePictureUrl} 
                    width={1080} 
                    height={1620} 
                    layout="responsive" 
                    alt={`image ${game.level.completePictureUrl}`}
                />
            </div>}

            {game && <div className={`aspect-[1080/1620] max-h-[85vh] w-full content-start absolute left-1/2 transform -translate-x-1/2 z-50 ${isComplete ? 'pointer-events-auto opacity-100 transition-opacity ease-out duration-200' : 'pointer-events-none opacity-0'}`}>
                <div className='absolute flex flex-col items-center justify-center w-full py-8 text-2xl font-bold text-blue-500 transform -translate-y-1/2 bg-gray-300 top-1/2'>
                    <div>
                        Level Completed
                    </div>
                    
                    {levelIndex < game.levels.length - 1 && <button className='px-2 py-1 mt-2 text-xs text-white bg-blue-600 border border-blue-500 rounded hover:bg-blue-500' onClick={() => changeLevel(1)}>
                        Next Level
                    </button>}
                </div>
            </div>}

            {game && <div className={`aspect-[1080/1620] max-h-[85vh] w-full content-start absolute left-1/2 transform -translate-x-1/2 z-50 bg-gray-300 ${loading ? 'pointer-events-auto opacity-100 transition-opacity ease-out duration-200' : 'pointer-events-none opacity-0'}`}>
                <div className='absolute text-xl font-semibold transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                    Loading...
                </div>
            </div>}
        </div>

        {game && <div className='absolute items-center w-full mt-1 leading-none text-center text-white bottom-10'>
            <div className='flex items-center justify-center w-full mx-auto md:w-2/12'>
                <button className='px-2 py-1 text-xs bg-blue-600 border border-blue-500 rounded hover:bg-blue-500' onClick={() => game.completeLevel()}>Set Complete</button>
            </div>
        </div>}
    </DndProvider>
}

export default Container
