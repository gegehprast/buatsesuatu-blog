export interface Piece {
    id: number;
    url: string;
    correct?: boolean;
}

export type Observer = ((pieces: Piece[]) => void) | null
