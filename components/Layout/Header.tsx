import React, { useState, useContext, useEffect, useMemo, useCallback, useRef } from 'react'
import debounce from 'lodash.debounce'
import Link from 'next/link'
import { LoadingProgressContext } from '../Context/LoadingProgress'
import { useRouter } from 'next/dist/client/router'

const Header = ({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: () => void}): React.ReactElement => {
    const router = useRouter()
    const searchInput = useRef<HTMLInputElement | null>(null)
    const [search, setSearch] = useState<string>(router.query.search ? router.query.search as string : '')
    const { pageLoading } = useContext(LoadingProgressContext)

    useEffect(() => {
        setSearch(router.query.search ? router.query.search as string : '')
    }, [router.query.search])

    const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
        (e) => {
            router.push(
                {
                    pathname: '/',
                    query: { search: e.target.value },
                },
                `/?search=${e.target.value}`,
                { shallow: true }
            )
        },
        [router]
    )
    
    const debouncedResults = useMemo(() => {
        console.log('denbounce')
        return debounce(handleChange, 300)
    }, [handleChange])

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (searchInput.current && searchInput.current.value.length) {
                return router.push(
                    {
                        pathname: '/',
                        query: { search: searchInput.current.value },
                    },
                    `/?search=${searchInput.current.value}`,
                    { shallow: true }
                )
            }
            
            if (search === '') {
                router.push('/', '/', { shallow: true })
            }
        }
    }

    useEffect(() => {
        return () => {
            debouncedResults.cancel()
        }
    })

    return (
        <>
            <div className="sticky top-0 z-50 w-full bg-white border-b shadow dark-bg-white">
                <div
                    className={`w-full ${
                        pageLoading && 'bg-indigo-900 dark-bg-indigo-900'
                    }`}
                    style={{ height: '0.1rem' }}
                ></div>

                <div className="flex flex-wrap items-center justify-center w-full px-3 py-2 mx-auto md:justify-between md:w-3/4 lg:w-5/6 xl:w-1/2 xxl-1344:w-4/6 xxl-1920:w-1/2 xxl-4k:w-1/3">
                    <div className="w-full py-1 mt-1 text-center lg:mt-0 md:w-auto md:text-left">
                        <Link href="/" as="/">
                            <a>
                                <h2 className="text-xl font-bold leading-none lg:text-2xl">
                                    Buat Sesuatu
                                </h2>
                            </a>
                        </Link>
                    </div>

                    <div className="flex w-1/2 mt-3 mb-2 mr-2 lg:self-stretch md:mb-0 md:mt-1 md:mx-4 lg:mt-0">
                        <input
                            type="text"
                            className="w-full px-3 py-1 duration-200 ease-in focus:outline-none search-bar"
                            onChange={debouncedResults}
                            onKeyUp={handleKeyUp}
                            defaultValue={search}
                            placeholder="Cari..."
                            ref={searchInput}
                        />
                    </div>

                    <div className="flex items-center py-1 mt-3 md:mb-0 md:mt-1 lg:mt-0">
                        <div className="flex items-end ml-8">
                            <button
                                className={`darkModeButton ${
                                    darkMode
                                        ? 'text-white dark-text-white'
                                        : 'text-gray-900 dark-text-gray-900'
                                }`}
                                onClick={setDarkMode}
                                title="Mode malam"
                            >
                                <svg
                                    className="w-6 h-6 leading-none fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 2v16a8 8 0 1 0 0-16zm0 18a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
