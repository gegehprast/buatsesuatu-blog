import React, { useState, useEffect } from 'react'
import { getUser } from '../utils/auth'
import cookie from 'js-cookie'
import Axios from 'axios'
import Link from 'next/link'

interface User {
    username: string
    name: string
}

const FloatingMenu = (): React.ReactElement | null => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState<User | undefined>()

    useEffect(() => {
        const token = cookie.get('loggedinToken')
        let cancel: () => void

        if (!token) {
            return
        }

        setLoggedIn(true)
        getUser({
            cancelToken: new Axios.CancelToken(c => cancel = c),
            onSuccess: (res) => {
                setUser(res.data)
            },
            onError: () => {
                setUser(undefined)
                setLoggedIn(false)
                removeCookies()
            }
        })

        return () => cancel()
    }, [])

    const removeCookies = (): void => {
        cookie.remove('loggedinToken', {
            expires: 1
        })
        cookie.remove('loggedin', {
            expires: 1
        })
    }

    const handleLogout = (): void => {
        removeCookies()
    }

    if (!loggedIn || !user) {
        return null
    }

    return (
        <div className="fixed bottom-0 right-0 w-full appearance-none md:px-4 md:w-2/6 lg:w-1/4">
            <div className="p-2 text-gray-900 bg-gray-100 border-t shadow border-t-gray-500 md:border md:border-gray-600 md:rounded">
                <div className="font-semibold leading-none">
                    Hello, {user.name}!
                </div>

                <div className="flex mt-4">
                    <Link href="/articles/create" as="/articles/create">
                        <a className="p-2 leading-none text-white bg-indigo-700 border rounded hover:bg-indigo-800 active:bg-indigo-900">Create</a>
                    </Link>
                    <button className="p-2 leading-none text-white bg-gray-600 border rounded hover:bg-gray-700 active:bg-gray-500" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default FloatingMenu
