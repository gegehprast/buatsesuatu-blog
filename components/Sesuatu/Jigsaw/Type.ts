import { Game } from "./Game/Game"

export interface Piece {
    id: number;
    url: string;
    correct?: boolean;
}

export type Observer = ((levelString: string) => void) | null
