import React from 'react'
import ReactMarkdown from 'react-markdown'
import slugify from 'react-slugify'

interface Props {
    children: string
    level?: number
}

const Heading = (props: Props): JSX.Element => {
    if (props.level === 2) {
        return <H2 text={props.children} />
    }

    if (props.level === 3) {
        return <H3 text={props.children} />
    }

    const Heading = ReactMarkdown.renderers.heading
    return <Heading {...props} />
}

const H2 = ({ text }: { text: string }): JSX.Element => {
    const href = slugify(text)
    
    return <h2>
        <span id={href} className="invisible block prevent-headbutting"> &nbsp; </span>
        <a href={`#${href}`} 
            className="text-xl font-bold text-indigo-600 sm:text-2xl hover:text-indigo-800"
        >
            # {text}
        </a>
    </h2>
}

const H3 = ({ text }: { text: string }): JSX.Element => {
    const href = slugify(text)

    return <h3>
        <span id={href} className="invisible block prevent-headbutting"> &nbsp; </span>
        <a href={`#${href}`} 
            className="text-xl font-bold sm:text-xl hover:text-indigo-700" 
        >
            {text}
        </a>
    </h3>
}

export default Heading