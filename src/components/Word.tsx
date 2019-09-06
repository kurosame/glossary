import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import styled from 'styled-components'
import { Card, CardContent, CardHeader, Chip } from '@material-ui/core'
import CodeHighlighter from '@/components/CodeHighlighter'
import { WordState } from '@/modules/word'

interface Props {
  word: WordState
}

export const Word = (props: Props): JSX.Element => (
  <Card>
    <CardHeader title={<h3>{props.word.id}</h3>} data-test="id" />
    <CardContent data-test="titles">
      {props.word.titles.map((t, i) => (
        <TitlesSpan key={i}>
          <Chip label={t} />
        </TitlesSpan>
      ))}
    </CardContent>
    <CardContent data-test="description">
      <ReactMarkdown
        source={props.word.description}
        renderers={{ code: CodeHighlighter }}
        escapeHtml={false}
      />
    </CardContent>
  </Card>
)

const TitlesSpan = styled.span`
  margin-right: 5px;
`

export default Word
