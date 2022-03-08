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
                <div className='w-full pt-10'>
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
