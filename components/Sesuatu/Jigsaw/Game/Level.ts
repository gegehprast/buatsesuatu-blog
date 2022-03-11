import EventEmitter from 'eventemitter3'
import { shuffle2 } from '../../../../utils/array'
import { Piece } from '../Type'

export abstract class Level extends EventEmitter {
    /**
     * The completed state of the pieces.
     */
    private completePieces: Piece[]

    /**
     * The interactable pieces.
     */
    public pieces: Piece[]

    /**
     * Anchor index.
     */
    public anchorIndex: number

    /**
     * Is the level completed.
     */
    public isCompleted: boolean = false

    public abstract columns: number
    
    public abstract rows: number
    
    public abstract completePictureUrl: string

    constructor() {
        super()

        this.completePieces = this._completePieces()

        this.anchorIndex = this._anchorIndex()

        // shuffle the pieces
        this.pieces = shuffle2([...this.completePieces], [this.anchorIndex])
        this.pieces = this.pieces.map((piece, index) => {
            const newPiece = {...piece, ...{ currentIndex: index }}
            newPiece.correct = this.isCorrect(piece)

            return newPiece
        })
    }

    /**
     * Handling the completed pieces.
     */
    protected abstract _completePieces(): Piece[]

    /**
     * Handling the anchor index.
     */
    protected abstract _anchorIndex(): number

    /**
     * Swap two pieces.
     * 
     * @param pieceIndexA 
     * @param pieceIndexB 
     */
    public swap(pieceIndexA: number, pieceIndexB: number): void {
        // clone
        const tempPieces: Piece[] = this.pieces;

        // swap
        [tempPieces[pieceIndexA], tempPieces[pieceIndexB]] = [tempPieces[pieceIndexB], tempPieces[pieceIndexA]]

        // set current index
        tempPieces[pieceIndexA].currentIndex = pieceIndexA
        tempPieces[pieceIndexB].currentIndex = pieceIndexB

        // set `correct`
        tempPieces[pieceIndexA].correct = this.isCorrect(tempPieces[pieceIndexA])
        tempPieces[pieceIndexB].correct = this.isCorrect(tempPieces[pieceIndexB])

        // set new pieces state
        this.pieces = tempPieces

        // is complete?
        this.isCompleted = this.isComplete()

        if (this.isCompleted) {
            this.emit('COMPLETE')
        } else {
            console.log('NOT COMPLETOOOO')
        }
    }

    /**
     * Is a piece in correct position index?
     * 
     * @param pieceA 
     * @param index 
     * @returns 
     */
    public isCorrect(pieceA: Piece): boolean {
        return pieceA.id - 1 === pieceA.currentIndex
    }

    /**
     * Is all the piece in its correct position index? 
     * 
     * @returns 
     */
    public isComplete() {
        return (this.completePieces.length == this.pieces.length) && this.completePieces.every((element, index) => {
            return element.id === this.pieces[index].id 
        })
    }

    public completeLevel() {
        console.log('level cl')
        this.pieces = this.completePieces

        this.emit('COMPLETE')
    }
}
