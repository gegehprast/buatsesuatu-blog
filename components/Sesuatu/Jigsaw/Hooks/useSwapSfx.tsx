import React, { useEffect, useState } from 'react'

export type SwapSFX = [boolean, () => void, () => void]

const useSwapSfx = (): SwapSFX => {
    const [audio, setAudio] = useState<HTMLAudioElement>()
    const [playing, setPlaying] = useState(false)
    
    useEffect(() => {
        if (audio) {
            if (playing) {
                audio.play()
            } else {
                audio.pause()
                audio.currentTime = 0
            }
        }
    }, [audio, playing])

    useEffect(() => {
        audio && audio.addEventListener('ended', () => setPlaying(false))

        return () => {
            audio && audio.removeEventListener('ended', () => setPlaying(false))
        }
    }, [audio])

    useEffect(() => {
        setAudio(new Audio('/audio/jigsaw/swap.wav'))
    }, [])

    const toggle = () => setPlaying(!playing)

    const play = () => {
        setPlaying(false)
        setPlaying(true)
    }
  
    return [playing, play, toggle]
}

export default useSwapSfx
