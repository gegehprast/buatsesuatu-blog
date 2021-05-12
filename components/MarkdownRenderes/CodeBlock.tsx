import React from 'react'
import { CodeComponent } from 'react-markdown/src/ast-to-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const CodeBlock: CodeComponent = ({ inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '')

    return !inline && match ? (
        <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
            {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
    ) : (
        <code className={className} {...props}>
            {String(children).replace(/\n$/, '')}
        </code>
    )
}

export default CodeBlock