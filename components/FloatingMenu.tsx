import React, { useContext} from 'react'
import { removeAuthCookies } from '../utils/auth'
import Link from 'next/link'
import { AuthContext } from './Context/AuthContext'

const FloatingMenu = (): React.ReactElement | null => {
    const { loggedIn, user, setLoggedIn, setUser } = useContext(AuthContext)
    
    const handleLogout = (): void => {
        removeAuthCookies()
         
        setTimeout(() => {
            setLoggedIn(false)
            setUser(undefined)
        }, 1000)
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
