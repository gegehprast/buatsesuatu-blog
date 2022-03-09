import React from 'react'
import { DndProvider, } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import Panel from './Panel'
import { Game } from './Game/Game'
import useSwapSfx from './Hooks/useSwapSfx'

const Board: React.FC<{ game: Game }> = ({ game }) => {
    const [playing, play] = useSwapSfx()

    const gridCols: Record<string, string> = {
        '2': 'grid-cols-2',
        '4': 'grid-cols-4',
    }
    
    return <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <div className={`grid ${gridCols[game.level.columns]} gap-0 aspect-[1080/1620] max-h-[85vh] w-full mx-auto content-start`}>
            {game.level.pieces.map((piece, i) => <div key={i} className="aspect-square">
                <Panel game={game as Game} playSwapSFX={play} index={i} />
            </div>)}
        </div>
    </DndProvider>
}

export default Board
