import React from 'react'
import Link from 'next/link'

const Header: React.FC = () => {
    return (
        <>
            <div className="fixed w-full border shadow">
                <div className="flex flex-wrap items-center justify-around w-3/4 p-3 mx-auto">
                    <div>
                        <h2 className="text-lg font-bold">Buat Sesuatu</h2>
                    </div>

                    <div className="flex mt-4 w-100 md:mt-0">
                        <div className="mx-2">
                            <Link href="/" as="/">
                                <a>Postingan</a>
                            </Link>
                        </div>

                        <div className="mx-2">
                            <Link href="/page3" as="/page3">
                                <a>Tutorial</a>
                            </Link>
                        </div>

                        <div className="mx-2">
                            <Link href="/page2" as="/page2">
                                <a>Tentang</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-8 appearance-none pointer-events-none"></div>
        </>
    )
}

export default Header
