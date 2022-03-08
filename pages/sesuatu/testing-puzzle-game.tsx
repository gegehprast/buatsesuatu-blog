import Head from 'next/head'
import React from 'react'
import BlankLayout from '../../components/Layout/BlankLayout'
import Board from '../../components/Sesuatu/Jigsaw/Board'
import { MyNextComponentType } from '../_app'

const TestingPuzzleGame: MyNextComponentType = () => {
    return (
        <>
            <Head>
                <title key="title">Testing Puzzle Game | {process.env.NEXT_PUBLIC_TITLE}</title>
            </Head>
            
            <div className='w-full'>
                <div className='items-center w-full p-2 leading-none text-center text-white'>
                    <h1 className='text-lg font-semibold'>Puzzle Game</h1>

                    <span className='text-xs'>
                        Potongan dengan ikon gembok adalah patokan
                    </span>
                </div>

                <div className='w-full mt-2'>
                    <Board />
                </div>
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
