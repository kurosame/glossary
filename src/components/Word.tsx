import { IWordState } from '@/modules/word'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  word: IWordState
}

export default class Word extends React.Component<IProps> {
  public render() {
    return (
      <Card>
        <CardHeader title={<b>{this.props.word.id}</b>} />
        <Titles>
          {this.props.word.titles.map((t, i) => <Chip key={i}>{t}</Chip>)}
        </Titles>
        <CardText>
          {this.props.word.description
            .split('\\n')
            .map((d, i) => <div key={i}>{d}</div>)}
        </CardText>
      </Card>
    )
  }
}

const Titles = styled.div`
  display: flex;
  padding: 0 16px;
`
