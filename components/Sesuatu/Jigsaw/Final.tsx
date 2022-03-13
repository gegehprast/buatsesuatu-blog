import React, { useEffect, useMemo, useRef, useState } from 'react'
import { random } from '../../../utils/number'
import ArrowSmRight from '../../Icons/ArrowSmRight'
import { TextScramble } from './TextScramble/TextScramble'

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

const forMyLove = [
    'Halo, Al!',
    'Makasih ya, wes bersedia jadi bahan survei. 😀 ',
    'Tapi iku mek boongan, hahaha. 🤣😛'
]

const Final: React.FC<{ show: boolean }> = ({ show }) => {
    const fx = useMemo(() => new TextScramble(), [])
    const [cooldown, setCooldown] = useState(false)
    const [textIndex, setTextIndex] = useState<number | null>(null)
    const [textRef, setText] = useState('')

    useEffect(() => {
        fx.observe((text: string) => {
            setText(text)
        })
    })

    useEffect(() => {
        let t: ReturnType<typeof setTimeout>

        if (show) {
            t = setTimeout(() => {
                nextText()
            }, 2500);
        }
    
        return () => {
            clearTimeout(t)
        }
    }, [show])
    

    useEffect(() => {
        console.log('textIndex', textIndex)
        
        if (textIndex !== null) {
            console.log('setting ', forMyLove[textIndex])
            fx.setText(textRef, forMyLove[textIndex])
        }
    }, [textIndex])
    

    useEffect(() => {
        let t: ReturnType<typeof setTimeout>

        if (cooldown) {
            t = setTimeout(() => {
                setCooldown(false)
            }, 1000);
        }
    
        return () => {
            clearTimeout(t)
        }
    }, [cooldown])

    const nextText = () => {
        console.log('next', cooldown)
        if (cooldown) {
            return
        }

        const nextIndex = textIndex !== null ? (textIndex + 1) : 0

        console.log(nextIndex, forMyLove.length)

        if (nextIndex >= forMyLove.length) {
            return
        }
        
        setTextIndex(nextIndex)
        
        setCooldown(true)
    }

    return (
        <div className='relative w-full h-full bg-pink-200'>
            <div className='pointer-events-none raining-heart'>
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

            <div className='absolute top-0 left-0 flex flex-col justify-center w-full min-h-screen p-2 overflow-hidden'>
                <div className='flex content-center justify-center'>
                    <span className='leading-loose font-ayuku text_shadows'>
                        {textRef}
                    </span>
                </div>
            </div>

            {textIndex !== null && <div className='absolute top-0 left-0 flex flex-col justify-end w-full min-h-screen overflow-hidden'>
                <div className='relative flex content-center justify-center p-4'>
                    <div className='relative flex content-center justify-center w-12 h-12'>
                        <div className={`absolute w-full h-full p-2 rounded-full bg-jigsaw-pink-main ${cooldown ? 'cursor-wait' : 'animate-ping'}`}></div>
                        
                        <button className='relative flex items-center justify-center w-12 h-12 p-2 text-pink-200 rounded-full bg-jigsaw-pink-main' onClick={nextText}>
                            <span className={`${cooldown ? 'cursor-wait' : 'animate-bounce-right'}`}>
                                <ArrowSmRight />
                            </span>
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    )
}
    
export default Final
