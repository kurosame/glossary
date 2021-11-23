import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface Props {
  language?: string
  children: React.ReactNode & React.ReactNode[]
}

const CodeHighlighter: React.VFC<Props> = p => {
  const { language, children } = p
  return (
    <SyntaxHighlighter language={language} style={atomDark} showLineNumbers data-testid="code-highlighter">
      {children}
    </SyntaxHighlighter>
  )
}

export default CodeHighlighter
