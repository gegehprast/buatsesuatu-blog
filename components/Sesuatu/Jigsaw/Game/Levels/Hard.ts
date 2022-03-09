import Level from '../Level';

class Hard extends Level {
    protected _completePieces() {
        return [...Array(24)]
            .map((item, i) => (
                {
                    id: i + 1,
                    url: `/images/jigsaw/image_part_0${(i + 1).toString().length > 1 ? i + 1 : '0' + (i + 1)}.png`,
                }
            ))
    }

    protected _anchorIndex() {
        const anchorIndexProbs: number[] = [0, 2, 3, 5, 10, 12, 19, 23]
        
        return anchorIndexProbs[Math.floor(Math.random() * anchorIndexProbs.length)]
    }
}  

export default Hard
