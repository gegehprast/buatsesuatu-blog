/* eslint-disable no-prototype-builtins */

import { NextRouter } from 'next/dist/client/router'

/**
 * Check if something is undefined.
 */
const isUndefined = (variable: any) => {
    return typeof variable === 'undefined'
}

/**
 * Make url query parameter from json object.
 */
const objectToUrlQuery = (object: any, applyArray = true) => {
    let param = ''
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            let element = object[key]

            if (Array.isArray(object[key])) {
                element = applyArray ? element.join(',') : null
            }

            if (element && !isUndefined(element) && element != '') {
                param = param == '' ? `?${key}=${element}` : `${param}&${key}=${element}`
            }
        }
    }

    return param
}

/**
 * Push next router. 
 * This will only change the necessary query parameters of current route.
 */
export const pushRouterQueries = (router: NextRouter, { params, as = null, resetScroll = false }: pushRouterQueriesOptions): void => {
    const newParams = { ...router.query, ...params }
    const asPath = (as ? as : router.pathname) + objectToUrlQuery(newParams, false)

    router.push({
        pathname: router.pathname,
        query: newParams,
    }, asPath, { shallow: true }).then(() => {
        if (resetScroll) {
            setTimeout(() => {
                window.scrollTo(0, 0)
            }, 150)
        }
    })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const handleImageError = (e: any): void => {
    e.target.onerror = null
    e.target.src = '/logo-fit.png'
}

interface pushRouterQueriesOptions {
    params: {[p: string]: string | number | boolean}
    as?: string | null | undefined
    resetScroll?: boolean
}
