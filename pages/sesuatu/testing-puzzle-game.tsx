import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import BlankLayout from '../../components/Layout/BlankLayout'
import { MyNextComponentType } from '../_app'

const Container = dynamic( () => import('../../components/Sesuatu/Jigsaw/Container'), { ssr: false } )
const Final = dynamic( () => import('../../components/Sesuatu/Jigsaw/Final'), { ssr: false } )

const TestingPuzzleGame: MyNextComponentType = () => {
    const [showFinal, setShowFinal] = useState(false)
    
    return (
        <>
            <Head>
                <title key="title">Testing Puzzle Game | {process.env.NEXT_PUBLIC_TITLE}</title>
            </Head>
            
            <div className={`absolute top-0 left-0 w-full h-screen z-50`}>
                <div className='items-center w-full p-1 leading-none text-center text-white'>
                    <h1 className='text-lg font-semibold'>Puzzle Game</h1>

                    <span className='text-xs'>
                        Potongan dengan ikon gembok adalah patokan
                    </span>
                </div>

                <Container setShowFinal={setShowFinal} />
            </div>
            
            <div className={`absolute top-0 left-0 w-full h-screen transition-opacity ${showFinal ? 'pointer-events-auto opacity-100 ease-in-out duration-[5000ms] z-50' : 'pointer-events-none opacity-0'}`}>
                <Final show={showFinal} />
            </div>
        </>
    )
}

TestingPuzzleGame.getLayout = (page) => {
    return (
        <BlankLayout>
            {page}
        </BlankLayout>
    )
}

export default TestingPuzzleGame
