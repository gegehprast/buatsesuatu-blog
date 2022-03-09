import { shuffle2 } from "../../../../utils/array"
import { Piece } from "../Type"

abstract class Level {
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

    constructor() {
        this.completePieces = this._completePieces()

        this.anchorIndex = this._anchorIndex()

        // shuffle the pieces
        this.pieces = shuffle2([...this.completePieces], [this.anchorIndex])
        this.pieces = this.pieces.map((piece, index) => {
            return {...piece, ...{ correct: this.isCorrect(piece, index) }}
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

        // set `correct`
        tempPieces[pieceIndexA].correct = this.isCorrect(tempPieces[pieceIndexA], pieceIndexA)
        tempPieces[pieceIndexB].correct = this.isCorrect(tempPieces[pieceIndexB], pieceIndexB)

        // set new pieces state
        this.pieces = tempPieces

        // is complete?
        if (this.isComplete()) {
            console.log('COMPLETOOOO')
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
    public isCorrect(pieceA: Piece, index: number): boolean {
        return pieceA.id - 1 === index
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
}

export default Level
