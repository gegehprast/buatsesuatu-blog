import { Level } from '../Level';

export class Hard extends Level {
    public completePictureUrl = '/images/jigsaw/hard/hard.webp'

    public columns = 4
    
    public rows = 6

    protected _completePieces() {
        return [...Array(24)]
            .map((item, i) => (
                {
                    id: i + 1,
                    url: `/images/jigsaw/hard/image_part_0${(i + 1).toString().length > 1 ? i + 1 : '0' + (i + 1)}.png`,
                }
            ))
    }

    protected _anchorIndex() {
        const anchorIndexProbs: number[] = [0, 2, 3, 5, 10, 12, 19]
        
        return anchorIndexProbs[Math.floor(Math.random() * anchorIndexProbs.length)]
    }
}
