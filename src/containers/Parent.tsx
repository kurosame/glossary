import Word from '@/components/Word'
import { addCount, getSagaCount } from '@/modules/counter'
import { IActions, IStates } from '@/modules/index'
import { getWords } from '@/modules/word'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

interface IProps {
  states: IStates
  actions: IActions
}

class Parent extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
    props.actions.word.getWords()
  }

  public render() {
    return (
      <>{this.props.states.words.map(w => <Word key={w.id} state={w} />)}</>
    )
  }
}

export default connect(
  (states: IStates) => ({ states }),
  (dispatch: Dispatch) => ({
    actions: {
      counter: {
        addCount: bindActionCreators(addCount, dispatch),
        getSagaCount: bindActionCreators(getSagaCount, dispatch)
      },
      word: {
        getWords: bindActionCreators(getWords, dispatch)
      }
    }
  })
)(Parent)
