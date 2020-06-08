/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect, createContext } from 'react'
import Axios from 'axios'
import cookie from 'js-cookie'
import { getUser, removeAuthCookies } from '../../utils/auth'

interface User {
    username: string
    name: string
}

interface ProviderProps {
    children: React.ReactChild
}

interface IInitialAuthContext {
    fetching: boolean
    loggedIn: boolean
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    user: User | undefined
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const InitialUserContext: IInitialAuthContext = {
    fetching: true,
    loggedIn: false,
    setLoggedIn: () => { },
    user: undefined,
    setUser: () => { },
}

export const AuthContext = createContext(InitialUserContext)

export const AuthProvider = ({ children }: ProviderProps): JSX.Element => {
    const [fetching, setFetching] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState<User | undefined>()

    useEffect(() => {
        const token = cookie.get('loggedinToken')
        let cancel: () => void

        setFetching(true)

        if (!token) {
            setFetching(false)

            return
        }

        setLoggedIn(true)
        getUser({
            cancelToken: new Axios.CancelToken(c => cancel = c),
            onSuccess: (res) => {
                setFetching(false)
                setUser(res.data)
            },
            onError: () => {
                setFetching(false)
                setUser(undefined)
                setLoggedIn(false)
                removeAuthCookies()
            }
        })

        return () => cancel()
    }, [])

    return (
        <AuthContext.Provider value={{
            fetching,
            loggedIn,
            user,
            setLoggedIn,
            setUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
