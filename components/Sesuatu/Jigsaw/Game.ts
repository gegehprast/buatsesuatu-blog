import { shuffle2 } from '../../../utils/array'
import { Piece } from './Type'

export type Observer = ((pieces: Piece[]) => void) | null

export class Game {
    private completePieces: Piece[]

    private anchorIndexProbs = [0, 2, 3, 5, 10, 12, 19, 23]

    private observers: Observer[] = []

    public pieces: Piece[]

    public anchorIndex: number
    
    constructor() {
        this.completePieces = [...Array(24)]
            .map((item, i) => (
                {
                    id: i + 1,
                    url: `/images/jigsaw/image_part_0${(i + 1).toString().length > 1 ? i + 1 : '0' + (i + 1)}.png`,
                    correct: false,
                }
            ))

        this.anchorIndex = this.anchorIndexProbs[Math.floor(Math.random() * this.anchorIndexProbs.length)]

        this.pieces = shuffle2([...this.completePieces], [this.anchorIndex])
        this.pieces = this.pieces.map((piece, index) => {
            return {...piece, ...{ correct: this.isCorrect(piece, index) }}
        })
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

        tempPieces[pieceIndexA].correct = this.isCorrect(tempPieces[pieceIndexA], pieceIndexA)
        tempPieces[pieceIndexB].correct = this.isCorrect(tempPieces[pieceIndexB], pieceIndexB)

        this.pieces = tempPieces

        if (this.isComplete()) {
            console.log('COMPLETOOOO')
        } else {
            console.log('NOT COMPLETOOOO')
        }

        this.emitChange()
    }

    private isCorrect(pieceA: Piece, index: number): boolean {
        return pieceA.id - 1 === index
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
