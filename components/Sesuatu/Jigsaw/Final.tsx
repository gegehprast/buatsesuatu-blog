import React from 'react'
import { random } from '../../../utils/number'

const configs = [...Array(30)].map((item, i) => {
    const delay = random(0, 5000) - 3000

    return {
        heartTranslateX: random(0, 1000) - 500,
        heartTranslateZ: random(300, 1600) - 800,
        movableDropDelay: delay,
        rippleWaveDelay: delay + 3900,
        innerRotationDur: random(0, 3000) + 2000,
        heartSize: random(50, 60)
    }
})

const Final = () => {
    return (
        <div className='w-full h-full bg-pink-300'>
            <div className='raining-heart'>
                <div className='raining-heart-container ts-preserve3d'>
                    {configs.map((config, key) => (
                        <div key={key} className='absolute heart ts-preserve3d' style={{ transform: `translateX(${config.heartTranslateX}px) translateZ(${config.heartTranslateZ}px) scale3d(0.5, 0.5, 0.5)` }}>
                            <div className='ripple ts-preserve3d' style={{ animation: `wave 5000ms ${config.rippleWaveDelay}ms ease-out infinite` }}></div>
                            
                            <div className='inner ts-preserve3d' style={{ animation: `rotation ${config.innerRotationDur}ms linear infinite` }}>
                                <div style={{ width: `${config.heartSize}px`, height: `${config.heartSize}px` }}>
                                    <img src='/images/jigsaw/heart.png' className='w-full movable ts-preserve3d' style={{ animation: `drop 5000ms ${config.movableDropDelay}ms linear infinite` }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
    
export default Final
