import React from 'react'
import CodeHighlighter from '@/components/CodeHighlighter'

interface Props {
  inline?: boolean
  className?: string
  children: React.ReactNode & React.ReactNode[]
}

const CodeBlock: React.VFC<Props> = p => {
  const { inline, className, children, ...props } = p
  const match = /language-(\w+)/.exec(className || '')
  return !inline && match ? (
    <CodeHighlighter language={match[1]}>{children}</CodeHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

export default CodeBlock