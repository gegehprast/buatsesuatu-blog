import React from 'react'
import { HeadingComponent } from 'react-markdown/src/ast-to-react'
import slugify from 'react-slugify'

export const H1: HeadingComponent = ({ children }) => {
    const href = slugify(children)

    return <h1>
        <span id={href} className="invisible block prevent-headbutting"> &nbsp; </span>
        <a href={`#${href}`}
            className="text-2xl font-bold text-indigo-600 sm:text-3xl hover:text-indigo-800"
        >
            {children}
        </a>
    </h1>
}

export const H2: HeadingComponent = ({ children }) => {
    const href = slugify(children)
    
    return <h2>
        <span id={href} className="invisible block prevent-headbutting"> &nbsp; </span>
        <a href={`#${href}`} 
            className="text-xl font-bold text-indigo-600 sm:text-2xl hover:text-indigo-800"
        >
            # {children}
        </a>
    </h2>
}

export const H3: HeadingComponent = ({ children }) => {
    const href = slugify(children)

    return <h3>
        <span id={href} className="invisible block prevent-headbutting"> &nbsp; </span>
        <a href={`#${href}`} 
            className="text-xl font-bold sm:text-xl hover:text-indigo-700" 
        >
            {children}
        </a>
    </h3>
}
