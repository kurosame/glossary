import CodeHighlighter from '@/components/CodeHighlighter'
import type { WordState } from '@/modules/word'
import { Card, CardContent, CardHeader, Chip } from '@material-ui/core'
import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import styled from 'styled-components'

interface Props {
  word: WordState
}

const TitlesSpan = styled.span`
  margin-right: 5px;
`

const Word: React.FC<Props> = p => (
  <Card>
    <CardHeader title={<h3>{p.word.id}</h3>} data-testid="card-id" />
    <CardContent data-testid="card-titles">
      {p.word.titles.map(t => (
        <TitlesSpan key={t}>
          <Chip label={t} />
        </TitlesSpan>
      ))}
    </CardContent>
    <CardContent data-testid="card-description">
      <ReactMarkdown source={p.word.description} renderers={{ code: CodeHighlighter }} escapeHtml={false} />
    </CardContent>
  </Card>
)

export default Word
