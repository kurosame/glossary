import React from 'react'

import CodeHighlighter from '@/components/CodeHighlighter'

interface Props {
  inline?: boolean
  className?: string | undefined
  children: React.ReactNode & React.ReactNode[]
}

const CodeBlock: React.FC<Props> = ({ inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '')
  return !inline && match && match[1] ? (
    <CodeHighlighter language={match[1]}>{children}</CodeHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

export default CodeBlock
