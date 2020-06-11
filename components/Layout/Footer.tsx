import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
    return (
        <>
            <div className="relative w-full mt-10 bg-indigo-900 min-h-400-px md:min-h-480-px">
                <Logo />

                <div className="relative z-10 flex flex-col justify-center w-full px-3 py-8 text-white xl:justify-between md:px-4 md:w-3/4 lg:w-5/6 xl:w-1/2 xxl-1344:w-4/6 xxl-1920:w-1/2 xxl-4k:w-1/3 md:mx-auto xl:flex-row">
                    <div className="w-full h-auto xl:w-3/12">
                        <div className="mb-1 text-lg font-bold md:text-xl">Halo, pengunjung!</div>
                        <ul className="font-semibold leading-normal">
                            <li className="py-1 text-sm xl:py-2 md:text-base">
                                <Link href="/about">
                                    <a className="hover:text-indigo-300 transition-color transition-400 transition-ease">Tentang</a>
                                </Link>
                            </li>
                            <li className="py-1 text-sm xl:py-2 md:text-base">
                                <a href="#" className="hover:text-indigo-300 transition-color transition-400 transition-ease">Kebijakan Privasi</a>
                            </li>
                            <li className="py-1 text-sm xl:py-2 md:text-base">
                                <a href="https://github.com/gegehprast/buatsesuatu" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 transition-color transition-400 transition-ease">Sumber Terbuka</a>
                            </li>
                        </ul>
                    </div>

                    <div className="w-full h-auto mt-8 xl:w-9/12 sm:mt-0 md:mt-8 xl:mt-0">
                        <div className="mb-1 text-lg font-bold md:text-xl">Kata Bijak</div>
                        <div className="text-sm italic font-light leading-normal text-gray-100 md:text-base">
                            <p className="leading-loose">&quot;Waiting doesn&apos;t get you love or help you finding an octopus.&quot; - Sakata Gintoki</p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 z-10 w-full py-8 text-sm text-gray-400">
                    <div className="w-full px-3 leading-none md:px-4 md:w-3/4 lg:w-5/6 xl:w-1/2 xxl-1344:w-4/6 xxl-1920:w-1/2 xxl-4k:w-1/3 md:mx-auto">
                        © {process.env.NEXT_PUBLIC_TITLE}
                    </div>
                </div>
            </div>
        </>
    )
}

const Logo: React.FC = () => (
    <svg className="footer-logo" width="287" height="287" xmlns="http://www.w3.org/2000/svg">
        <g>
            <title>Buat Sesuatu</title>
            <rect fill="none" id="canvas_background" height="289" width="289" y="-1" x="-1" />
            <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
                <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%" />
            </g>
        </g>
        <g>
            <title>Buat Sesuatu</title>
            <path stroke="#ffffff" id="svg_8" d="m90.250035,143.500001l97.999989,-97.999994l97.999989,97.999994l-97.999989,97.999994l-97.999989,-97.999994z" strokeWidth="1.5" fill="#434190" />
            <path id="svg_6" d="m0.750004,143.500002l124.500022,-124.500009l124.500022,124.500009l-124.500022,124.500009l-124.500022,-124.500009z" strokeWidth="1.5" stroke="#ffffff" fill="#4c51bf" />
            <text stroke="#000" transform="rotate(-45 182.20124816894523,155.74142456054688) matrix(2.953310489654541,0,0,3.2030200009549503,-139.29545429348946,-346.1754788869724) " fontWeight="bold" textAnchor="start" fontFamily="Junction, sans-serif" fontSize="24" id="svg_19" y="165.078782" x="92.18829" strokeOpacity="null" strokeWidth="0" fill="#ffffff">BS</text>
        </g>
    </svg >
)

export default Footer
