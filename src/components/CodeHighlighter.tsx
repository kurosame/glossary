import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface Props {
  language?: string
  children: React.ReactNode & React.ReactNode[]
}

const CodeHighlighter: React.FC<Props> = ({ language, children }) => (
  <SyntaxHighlighter language={language} style={a11yDark as unknown} showLineNumbers data-testid="code-highlighter">
    {children}
  </SyntaxHighlighter>
)

export default CodeHighlighter
