import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface Props {
    value: string,
    language?: string
}

const CodeBlock = ({ language, value }: Props): JSX.Element => {
    return (
        <SyntaxHighlighter language={language} style={atomDark}>
            {value}
        </SyntaxHighlighter>
    )
}

export default CodeBlock