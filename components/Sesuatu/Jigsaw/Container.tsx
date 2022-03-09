import React, { useEffect, useMemo, useState } from 'react'
import { DndProvider, } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import Board from './Board'
import { Game } from './Game/Game'
import { Level } from './Game/Level'
import { Easy } from './Game/Levels/Easy'
import { Hard } from './Game/Levels/Hard'
import { Medium } from './Game/Levels/Medium'

const Container: React.FC = () => {
    const game = useMemo(() => new Game(), [])
    const [levelString, setLevelString] = useState('')

    useEffect(() => {
        game.observe(setLevelString)
    })

    const changeLevel = (_levelString: string) => {
        if (_levelString === levelString) {
            return
        }

        game.toLevel(_levelString)
    }
    
    return <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <div className='w-full mt-2'>
            {game && <Board game={game} />}
        </div>

        {game && <div className='items-center w-full mt-1 leading-none text-center text-white'>
            <div className='flex items-center justify-around w-full mx-auto md:w-2/12'>
                <button className='px-2 py-1 text-xs bg-blue-600 border border-blue-500 rounded hover:bg-blue-500' onClick={() => changeLevel('easy')}>Easy</button>
                <button className='px-2 py-1 text-xs bg-blue-600 border border-blue-500 rounded hover:bg-blue-500' onClick={() => changeLevel('medium')}>Medium</button>
                <button className='px-2 py-1 text-xs bg-blue-600 border border-blue-500 rounded hover:bg-blue-500' onClick={() => changeLevel('hard')}>Hard</button>
            </div>
        </div>}
    </DndProvider>
}

export default Container
