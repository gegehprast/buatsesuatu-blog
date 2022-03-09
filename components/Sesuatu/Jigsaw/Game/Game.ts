import { Observer } from '../Type'
import Level from './Level'
import Easy from './Levels/Easy'

export class Game {
    /**
     * Current level.
     */
    public level: Level

    /**
     * Observers.
     */
    private observers: Observer[] = []
    
    constructor() {
        this.level = new Easy
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
        this.observers.forEach(observer => observer && observer(this.level.pieces))
    }
}
