import { IWordState } from '@/modules/word'
import { Card, CardContent, CardHeader, Chip } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  word: IWordState
}

export default class Word extends React.Component<IProps> {
  public render() {
    return (
      <Card>
        <CardHeader title={<b>{this.props.word.id}</b>} data-test="id" />
        <CardContent data-test="titles">
          {this.props.word.titles.map((t, i) => (
            <TitlesSpan key={i}>
              <Chip label={t} />
            </TitlesSpan>
          ))}
        </CardContent>
        <CardContent data-test="descriptions">
          {this.props.word.descriptions.map(
            (d, i) => (d ? <div key={i}>{d}</div> : <br key={i} />)
          )}
        </CardContent>
      </Card>
    )
  }
}

const TitlesSpan = styled.span`
  margin-right: 5px;
`
