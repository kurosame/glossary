import Words from '@/components/Words'
import { IActions, IStates } from '@/modules/index'
import { getWords } from '@/modules/word'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

interface IProps {
  states: IStates
  actions: IActions
  match: { params: { category: string } }
}

class List extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
    props.actions.word.getWords()
  }

  public render() {
    return (
      <Words
        words={this.props.states.words.filter(
          w =>
            !this.props.match.params.category ||
            w.category === this.props.match.params.category
        )}
      />
    )
  }
}

export default connect(
  (states: IStates) => ({ states }),
  (dispatch: Dispatch) => ({
    actions: {
      word: {
        getWords: bindActionCreators(getWords, dispatch)
      }
    }
  })
)(List)
