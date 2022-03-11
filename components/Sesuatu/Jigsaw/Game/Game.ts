import EventEmitter from 'eventemitter3'
import { Observer } from '../Type'
import { Level } from './Level'
import { Easy } from './Levels/Easy'
import { Hard } from './Levels/Hard'
import { Medium } from './Levels/Medium'

export class Game extends EventEmitter {
    /**
     * Current level.
     */
    public level!: Level

    /**
     * Current level index.
     */
    public levelIndex!: number
    
    /**
     * Available levels.
     */
    public levels!: Level[]

    /**
     * Observers.
     */
    private observers: Observer[] = []
    
    constructor() {
        super()
        
        this.onLevelComplete = this.onLevelComplete.bind(this)

        this.setLevels()
    }

    public toLevel(index: number): void {
        this.levelIndex = index
        this.level = this.levels[this.levelIndex]

        this.emitChange()
    }

    public observe(observer: Observer): () => void {
        this.observers.push(observer)

        this.emitChange()

        return (): void => {
            this.observers = this.observers.filter((_observer) => _observer !== observer)
        }
    }

    public move(pieceIndexA: number, pieceIndexB: number): void {
        this.level.swap(pieceIndexA, pieceIndexB)

        this.emitChange()
    }

    public completeLevel() {
        while (!this.level.isCompleted) {
            for (let i = 0; i < this.level.pieces.length; i++) {
                const piece = this.level.pieces[i];
                
                this.move(piece.currentIndex!, piece.id - 1)
            }
        }
    }

    private setLevels() {
        this.levels = [
            new Easy(),
            new Medium(),
            new Hard(),
        ]

        for (let i = 0; i < this.levels.length; i++) {
            const level = this.levels[i];
            level.on('COMPLETE', this.onLevelComplete)
        }

        this.levelIndex = 0
        this.level = this.levels[this.levelIndex]
    }

    private onLevelComplete() {
        this.emit('LEVEL_COMPLETE')

        this.emitChange()
    }

    private emitChange() {
        this.observers.forEach(observer => observer && observer(this))
    }
}
