import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import styled from 'styled-components'

import { Card, CardContent, CardHeader, Chip } from '@material-ui/core'

import CodeBlock from '@/components/CodeBlock'
import type { WordState } from '@/modules/word'

interface Props {
  word: WordState
}

const TitlesSpan = styled.span`
  margin-right: 5px;
`

const Word: React.VFC<Props> = ({ word }) => (
  <Card>
    <CardHeader title={<h3>{word.id}</h3>} data-testid="card-id" />
    <CardContent data-testid="card-titles">
      {word.titles.map(t => (
        <TitlesSpan key={t}>
          <Chip label={t} />
        </TitlesSpan>
      ))}
    </CardContent>
    <CardContent data-testid="card-description">
      <ReactMarkdown
        components={{ code: CodeBlock }}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        rehypePlugins={[rehypeRaw]}
      >
        {word.description}
      </ReactMarkdown>
    </CardContent>
  </Card>
)

export default Word
