import { IWordState } from '@/modules/word'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import React from 'react'

interface IProps {
  state: IWordState
}

export default class Word extends React.Component<IProps> {
  public render() {
    return (
      <Card>
        <CardHeader
          title={this.props.state.id}
          subtitle={this.props.state.titles}
        />
        <CardText>
          {this.props.state.description
            .split('\\n')
            .map((d, i) => <div key={i}>{d}</div>)}
        </CardText>
      </Card>
    )
  }
}
