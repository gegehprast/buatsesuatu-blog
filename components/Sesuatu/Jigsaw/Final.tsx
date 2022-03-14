/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { random } from '../../../utils/number'
import ArrowSmRight from '../../Icons/ArrowSmRight'
import { TextScramble } from './TextScramble/TextScramble'
// import formylove from './formylove.json'
import RingBox from './RingBox'

const randomizeRain = () => [...Array(30)].map((item, i) => {
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

const rainConfigs = randomizeRain()

const Final: React.FC<{ show: boolean }> = ({ show }) => {
    const [texts, setTexts] = useState<string[]>([])

    useEffect(() => {
        const get = async () => {
            // setTexts(formylove)

            const resp = await fetch('https://cdn.shallty.moe/json/formylove.json', {
                method: 'get'
            })
            .then(resp => resp.json())
            .then(data => data)

            setTexts(resp)
        }

        get()
    }, [])

    if (texts.length < 1) {
        return null
    }

    return <TheElement show={show} texts={texts} />
}

const TheElement: React.FC<{ show: boolean; texts: string[] }> = ({ show, texts }) => {
    const fx = useMemo(() => new TextScramble(), [])
    const [cooldown, setCooldown] = useState(false)
    const [textIndex, setTextIndex] = useState<number>(54)
    const [text, setText] = useState('')
    const [hideText, setHideText] = useState(false)
    const [showLastText, setShowLastText] = useState(false)
    
    const configRef = useRef(rainConfigs)
    
    useEffect(() => {
        fx.observe(observer)

        return () => {
            fx.unobserve(observer)
        }
    })
    

    useEffect(() => {
        if (textIndex < (texts.length - 1)) {
            fx.setText(text, texts[textIndex])
        } else {
            setHideText(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    useEffect(() => {
        let t: ReturnType<typeof setTimeout>

        if (hideText) {
            t = setTimeout(() => {
                setText(texts[texts.length - 1])
                setShowLastText(true)
            }, 1050);
        }
        
        return () => {
            clearTimeout(t)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hideText])
    

    const observer = (text: string) => {
        if (textIndex !== null && textIndex === (texts.length - 1)) {
            return
        }

        setText(text)
    }

    const nextText = () => {
        if (cooldown) {
            return
        }

        const nextIndex = textIndex + 1

        if (nextIndex >= texts.length) {
            return
        }
        
        setTextIndex(nextIndex)
        
        setCooldown(true)
    }

    return (
        <div className='relative w-full h-full bg-pink-200'>
            <div className='pointer-events-none raining-heart'>
                <div className='raining-heart-container ts-preserve3d'>
                    {configRef.current.map((config, key) => (
                        <div key={key} className='absolute heart ts-preserve3d' style={{ transform: `translateX(${config.heartTranslateX}px) translateZ(${config.heartTranslateZ}px) scale3d(0.5, 0.5, 0.5)` }}>
                            <div className='ripple ts-preserve3d' style={{ animation: `wave 5000ms ${config.rippleWaveDelay}ms ease-out infinite` }}></div>
                            
                            <div className='inner ts-preserve3d' style={{ animation: `rotation ${config.innerRotationDur}ms linear infinite` }}>
                                <div style={{ width: `${config.heartSize}px`, height: `${config.heartSize}px` }}>
                                    <img src='/images/jigsaw/heart.png' alt="heart" className='w-full movable ts-preserve3d' style={{ animation: `drop 5000ms ${config.movableDropDelay}ms linear infinite` }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='absolute top-0 left-0 flex flex-col justify-center w-full min-h-screen p-2 overflow-hidden'>
                <div className='relative flex content-center justify-center min-h-[14rem]'>
                    <span className={`${hideText ? 'opacity-0' : 'opacity-100'} absolute top-0 transition-opacity duration-1000 ease-in leading-loose font-ayuku text-shadows text-shadows-animation`}>
                        {text}
                    </span>

                    <span className={`${showLastText ? 'opacity-100' : 'opacity-0'} absolute top-0 transition-opacity duration-[3000ms] ease-in-out leading-loose font-ayuku text-shadows`} style={{ animation: 'move 3s ease-in-out infinite' }}>
                        {text}
                    </span>
                </div>
            </div>

            <div className={`absolute top-0 left-0 flex flex-col justify-end w-full min-h-screen overflow-hidden transition-opacity duration-1000 ease-in-out ${hideText ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
                <div className='relative flex content-center justify-center p-4 pb-24'>
                    <div className='relative flex content-center justify-center w-12 h-12'>
                        <div className={`absolute w-full h-full p-2 rounded-full bg-jigsaw-pink-main ${cooldown ? 'cursor-wait' : 'animate-ping'}`}></div>
                        
                        <button className='relative flex items-center justify-center w-12 h-12 p-2 text-pink-200 rounded-full bg-jigsaw-pink-main' onClick={nextText}>
                            <span className={`${cooldown ? 'cursor-wait' : 'animate-bounce-right'}`}>
                                <ArrowSmRight />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`absolute bottom-[5vh] left-0 flex flex-col justify-end w-full transition-opacity duration-[3000ms] ease-in-out ${showLastText ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className='w-[200px] mx-auto' style={{ animation: 'move 3s ease-in-out infinite' }}>
                    <RingBox />
                </div>
            </div>
        </div>
    )
}
    
export default Final
