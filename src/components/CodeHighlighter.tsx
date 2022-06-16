import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface Props {
  language?: string
  children: React.ReactNode & React.ReactNode[]
}

const CodeHighlighter: React.VFC<Props> = ({ language, children }) => (
  <SyntaxHighlighter language={language} style={a11yDark} showLineNumbers data-testid="code-highlighter">
    {children}
  </SyntaxHighlighter>
)

export default CodeHighlighter
