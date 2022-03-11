import { Game } from "./Game/Game"

export interface Piece {
    id: number;
    url: string;
    correct?: boolean;
    currentIndex?: number;
}

export type Observer = ((game: Game) => void) | null
