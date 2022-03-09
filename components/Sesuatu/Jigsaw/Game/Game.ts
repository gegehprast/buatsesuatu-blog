import { Observer } from '../Type'
import { Level } from './Level'
import { Easy } from './Levels/Easy'
import { Hard } from './Levels/Hard'
import { Medium } from './Levels/Medium'

export class Game {
    /**
     * Current level.
     */
    public level: Level

    private levelString: string
    
    private levels: Record<string, Level>

    /**
     * Observers.
     */
    private observers: Observer[] = []
    
    constructor() {
        this.levels = {
            easy: new Easy(),
            medium: new Medium(),
            hard: new Hard(),
        }

        this.levelString = 'easy'
        this.level = this.levels[this.levelString]
    }

    public toLevel(level: string): void {
        this.levelString = level
        this.level = this.levels[this.levelString]

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

    private emitChange() {
        this.observers.forEach(observer => observer && observer(this.levelString))
    }
}
