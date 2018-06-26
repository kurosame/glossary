import { ICounterActions, ICounterState } from '@/modules/counter'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  state: ICounterState
  actions: ICounterActions
}

export default class Child extends React.Component<IProps> {
  public render() {
    return (
      <Div>
        <div>
          <span className="count">{this.props.state.count}</span>
          <button
            className="add-count"
            onClick={() => this.props.actions.addCount()}
          >
            ADD
          </button>
        </div>
        <div>
          <span className="saga-count">{this.props.state.sagaCount}</span>
          <button
            className="add-saga-count"
            onClick={() => this.props.actions.getSagaCount()}
          >
            ADD
          </button>
          ※redux-saga sample
        </div>
        <Card>
          <CardHeader title="Without Avatar" subtitle="Subtitle" />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec
            vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
            pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque
            lobortis odio.
          </CardText>
        </Card>
      </Div>
    )
  }
}

const Div = styled.div`
  color: white;
  background-color: blue;
`
