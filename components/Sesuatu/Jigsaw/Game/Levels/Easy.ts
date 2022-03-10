import { Level } from '../Level';

export class Easy extends Level {
    public completePictureUrl = '/images/jigsaw/easy/easy.webp'
    
    public columns = 2
    
    public rows = 3

    protected _completePieces() {
        return [...Array(6)]
            .map((item, i) => (
                {
                    id: i + 1,
                    url: `/images/jigsaw/easy/image_part_0${(i + 1).toString().length > 1 ? i + 1 : '0' + (i + 1)}.png`,
                }
            ))
    }

    protected _anchorIndex() {
        const anchorIndexProbs: number[] = [0, 2, 3, 5]
        
        return anchorIndexProbs[Math.floor(Math.random() * anchorIndexProbs.length)]
    }
}
