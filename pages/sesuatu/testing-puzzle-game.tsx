import Head from 'next/head'
import React from 'react'
import BlankLayout from '../../components/Layout/BlankLayout'
import Jigsaw from '../../components/Sesuatu/Jigsaw'
import { MyNextComponentType } from '../_app'

const TestingPuzzleGame: MyNextComponentType = () => {
    return (
        <div>
            <Head>
                <title key="title">Testing Puzzle Game | {process.env.NEXT_PUBLIC_TITLE}</title>
            </Head>
            
            <div className='w-[95%] mx-auto mt-20'>
                <Jigsaw />
            </div>
        </div>
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
