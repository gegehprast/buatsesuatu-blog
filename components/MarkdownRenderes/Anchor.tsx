import React from 'react'

interface Props {
    children: string
    href?: string
}

const Anchor = (props: Props): JSX.Element => {
    return <a href={props.href} className="text-indigo-600 visited:text-purple-600 hover:text-indigo-800" target="_blank" rel="noreferrer">
        {props.children}
    </a>
}

export default Anchor