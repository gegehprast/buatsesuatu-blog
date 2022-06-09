import React, { useState, useEffect } from 'react'
import { login } from '../../utils/auth'
import cookie from 'js-cookie'
import { useRouter } from 'next/dist/client/router'

const Login = (): React.ReactElement => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [loginSucess, setLoginSucess] = useState<boolean | undefined>()
    const [redirect, setRedirect] = useState(true)

    useEffect(() => {
        if (cookie.get('loggedin') === '1') {
            router.push('/', '/', { shallow: true })
        } else {
            setRedirect(false)
        }
    }, [router])

    const handleSubmit = async () => {
        setSubmitting(true)
        setLoginSucess(undefined)

        const { token, expires } = await login({ username, password })

        setSubmitting(false)

        if (!token) {
            setLoginSucess(false)

            return
        }

        cookie.set('loggedin', '1', { expires: new Date(expires as string) })
        cookie.set('loggedinToken', token, { expires: new Date(expires as string) })
        
        setLoginSucess(true)

        setTimeout(() => {
            router.push('/', '/', { shallow: true })
        }, 500)
    }

    if (redirect) {
        return <div></div>
    }

    return (
        <div className="p-4 md:w-1/4">
            <div className="flex items-center mb-2">
                <div className="w-1/3 mr-2">
                    <label className="font-semibold leading-none">Username</label>
                </div>
                <div className="flex justify-end w-2/3">
                    <input type="text" name="username" className="px-2 py-1 leading-none border border-gray-900 rounded" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
            </div>
            <div className="flex items-center mb-2">
                <div className="w-1/3 mr-2">
                    <label className="font-semibold leading-none">Password</label>
                </div>
                <div className="flex justify-end w-2/3">
                    <input type="password" name="password" className="px-2 py-1 leading-none border border-gray-900 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className="flex items-center justify-end mb-2">
                <button className="p-2 text-white bg-indigo-700 border rounded dark-text-white hover:bg-indigo-800 active:bg-indigo-900 dark-bg-indigo-900" onClick={handleSubmit}>{submitting ? 'Please wait...' : 'Login'}</button>
            </div>

            {(loginSucess !== undefined) && <div className="flex items-center w-full mb-2">
                {(loginSucess === true) && <span className="w-full p-2 text-white bg-green-600 border rounded dark-text-white">Login sucess. Redirecting...</span>}

                {(loginSucess === false) && <span className="w-full p-2 text-white bg-red-600 border rounded dark-text-white">Login failed. Please try again.</span>}
            </div>}
        </div>
    )
}

// eslint-disable-next-line react/display-name
Login.getLayout = (page: JSX.Element): JSX.Element => {
    return (
        <>{page}</>
    )
}

export default Login
