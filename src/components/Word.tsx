import { IWordState } from '@/modules/word'
import { Card, CardContent, CardHeader, Chip } from '@material-ui/core'
import React from 'react'

interface IProps {
  word: IWordState
}

export default class Word extends React.Component<IProps> {
  public render() {
    return (
      <Card>
        <CardHeader title={<b>{this.props.word.id}</b>} />
        <CardContent>
          {this.props.word.titles.map((t, i) => <Chip key={i} label={t} />)}
        </CardContent>
        <CardContent>
          {this.props.word.description
            .split('\\n')
            .map((d, i) => <div key={i}>{d}</div>)}
        </CardContent>
      </Card>
    )
  }
}
