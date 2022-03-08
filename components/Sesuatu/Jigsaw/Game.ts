import { shuffle2 } from '../../../utils/array'
import { Piece } from './Type'

export type Observer = ((pieces: Piece[]) => void) | null

export class Game {
    private completePieces: Piece[]

    public pieces: Piece[]

    public anchorIndex: number

    private observers: Observer[] = []

    constructor() {
        this.completePieces = [...Array(24)]
            .map((item, i) => (
                {
                    id: i + 1,
                    url: `/images/jigsaw/image_part_0${(i + 1).toString().length > 1 ? i + 1 : '0' + (i + 1)}.png`
                }
            ))

        this.anchorIndex = Math.floor(Math.random() * this.completePieces.length)

        this.pieces = shuffle2([...this.completePieces], [this.anchorIndex])
    }

    public observe(observer: Observer): () => void {
        this.observers.push(observer)

        this.emitChange()

        return (): void => {
            this.observers = this.observers.filter((_observer) => _observer !== observer)
        }
    }

    public move(pieceIndexA: number, pieceIndexB: number): void {
        const tempPieces: Piece[] = this.pieces;

        [tempPieces[pieceIndexA], tempPieces[pieceIndexB]] = [tempPieces[pieceIndexB], tempPieces[pieceIndexA]]

        this.pieces = tempPieces

        if (this.isComplete()) {
            console.log('COMPLETOOOO')
        } else {
            console.log('NOT COMPLETOOOO')
        }

        this.emitChange()
    }

    private emitChange() {
        this.observers.forEach(observer => observer && observer(this.pieces))
    }

    private isComplete() {
        return (this.completePieces.length == this.pieces.length) && this.completePieces.every((element, index) => {
            return element.id === this.pieces[index].id 
        })
    }
}
