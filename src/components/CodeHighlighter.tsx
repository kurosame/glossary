import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface IProps {
  value: string
  language: string
}

const CodeHighlighter = (props: IProps) => (
  <SyntaxHighlighter language={props.language} style={atomDark} showLineNumbers>
    {props.value}
  </SyntaxHighlighter>
)

export default CodeHighlighter
