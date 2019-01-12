import { IWordState } from '@/modules/word'
import { Card, CardContent, CardHeader, Chip } from '@material-ui/core'
import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import styled from 'styled-components'

interface IProps {
  word: IWordState
}

export const Word = (props: IProps) => (
  <Card>
    <CardHeader title={<b>{props.word.id}</b>} data-test="id" />
    <CardContent data-test="titles">
      {props.word.titles.map((t, i) => (
        <TitlesSpan key={i}>
          <Chip label={t} />
        </TitlesSpan>
      ))}
    </CardContent>
    <CardContent data-test="description">
      <ReactMarkdown source={props.word.description} escapeHtml={false} />
    </CardContent>
  </Card>
)

const TitlesSpan = styled.span`
  margin-right: 5px;
`

export default Word
