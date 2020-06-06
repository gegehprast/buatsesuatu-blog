import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { LoadingProgressContext } from '../Context/LoadingProgress'

const Header: React.FC = () => {
    const [search, setSearch] = useState('')
    const { pageLoading } = useContext(LoadingProgressContext)

    return (
        <>
            <div className="sticky top-0 z-50 w-full bg-white border-b shadow">
                {pageLoading && <div className="h-1 bg-indigo-900"></div>}
                
                <div className="flex flex-wrap items-center justify-center px-3 py-2 mx-auto md:justify-between w-100 md:w-3/4 lg:w-5/6 xl:w-1/2 xxl-1344:w-4/6 xxl-1920:w-1/2 xxl-4k:w-1/3">
                    <div className="w-full py-1 mt-1 text-center lg:mt-0 md:w-auto md:text-left">
                        <h2 className="text-xl font-bold leading-none lg:text-2xl">Oof!</h2>
                    </div>

                    <div className="flex py-1 mt-1 w-100 lg:mt-0">
                        <input type="text" className="mr-2 border rounded" onChange={(e) => setSearch(e.target.value)} value={search} />
                    </div>

                    <div className="flex py-1 mt-1 w-100 lg:mt-0">
                        <div className="mr-2">
                            <Link href="/" as="/">
                                <a>Postingan</a>
                            </Link>
                        </div>

                        <div className="mx-2">
                            <Link href="/page3" as="/page3">
                                <a>Tutorial</a>
                            </Link>
                        </div>

                        <div className="ml-2">
                            <Link href="/page2" as="/page2">
                                <a>Tentang</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
