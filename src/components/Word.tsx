import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import styled from 'styled-components'
import { Card, CardContent, CardHeader, Chip } from '@material-ui/core'
import CodeHighlighter from '@/components/CodeHighlighter'
import type { WordState } from '@/modules/word'

interface Props {
  word: WordState
}

const TitlesSpan = styled.span`
  margin-right: 5px;
`

const Word: React.FC<Props> = p => {
  const { word } = p
  return (
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
        <ReactMarkdown source={word.description} renderers={{ code: CodeHighlighter }} escapeHtml={false} />
      </CardContent>
    </Card>
  )
}

export default Word
