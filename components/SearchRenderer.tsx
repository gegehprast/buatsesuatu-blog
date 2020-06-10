import React from 'react'

interface Props {
    search: string
    text: string
}

const SearchRenderer = ({ search, text }: Props): JSX.Element => {
    const re = new RegExp(`(${search})`, 'igm')
    const result = text.replace(re, '<span class="bg-indigo-300">$1</span>')

    return <span dangerouslySetInnerHTML={{ __html: result }} />
}

export default SearchRenderer
