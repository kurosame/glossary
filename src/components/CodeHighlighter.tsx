import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface Props {
  value: string
  language: string
}

const CodeHighlighter: React.FC<Props> = p => (
  <SyntaxHighlighter language={p.language} style={atomDark} showLineNumbers>
    {p.value}
  </SyntaxHighlighter>
)

export default CodeHighlighter
