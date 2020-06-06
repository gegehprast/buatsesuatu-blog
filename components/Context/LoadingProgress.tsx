/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from 'react'

interface ProviderProps {
    children: React.ReactNode
}

interface IInitialLoadingProgressContext {
    pageLoading: boolean
    setPageLoading: React.Dispatch<React.SetStateAction<boolean>>
    pageLoadingProgress: number
    setPageLoadingProgress: React.Dispatch<React.SetStateAction<number>>
}

const initialLoadingProgressContext: IInitialLoadingProgressContext = {
    pageLoading: false,
    setPageLoading: () => { },
    pageLoadingProgress: 0,
    setPageLoadingProgress: () => { },
}

export const LoadingProgressContext = createContext(initialLoadingProgressContext)

export const LoadingProgressProvider = ({ children }: ProviderProps): JSX.Element => {
    const [pageLoading, setPageLoading] = useState(false)
    const [pageLoadingProgress, setPageLoadingProgress] = useState(0)


    return (
        <LoadingProgressContext.Provider value={{
            pageLoading, 
            setPageLoading,
            pageLoadingProgress, 
            setPageLoadingProgress,
        }}>
            {children}
        </LoadingProgressContext.Provider>
    )
}
