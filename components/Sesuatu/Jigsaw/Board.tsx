import React, { useEffect, useState } from 'react'
import Panel from './Panel'
import { Game } from './Game/Game'
import useSwapSfx from './Hooks/useSwapSfx'
import { Observer } from './Type'

const Board: React.FC<{ game: Game }> = ({ game }) => {
    const [playing, play] = useSwapSfx()
    const [pieces, setPieces] = useState(game.level.pieces)

    useEffect(() => {
        game.observe(observer)
    })
    
    const observer: Observer = (game: Game) => {
        setPieces(game.level.pieces)
    }

    const gridCols: Record<string, string> = {
        '2': 'grid-cols-2',
        '4': 'grid-cols-4',
    }
    
    return <div className={`grid ${gridCols[game.level.columns]} gap-0 aspect-[1080/1620] max-h-[85vh] w-full content-start absolute left-1/2 transform -translate-x-1/2`}>
        {pieces.map((piece, i) => <div key={i} className="aspect-square">
            <Panel game={game as Game} playSwapSFX={play} index={i} />
        </div>)}
    </div>
}

export default Board
