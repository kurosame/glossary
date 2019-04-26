import Words from '@/components/Words'
import { IStates } from '@/modules/states'
import { getWords, IWordActions, IWordState } from '@/modules/word'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

interface IProps {
  state: { words: IWordState[] }
  actions: IWordActions
  match: { params: { category: string } }
}

class List extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props)
    if (!props.state.words.length) {
      props.actions.getWords()
    }
  }

  public render() {
    return (
      <Words
        words={this.props.state.words.filter(
          w =>
            !this.props.match.params.category ||
            w.category === this.props.match.params.category
        )}
      />
    )
  }
}

export default connect(
  (states: IStates) => ({ state: { words: states.words } }),
  (dispatch: Dispatch) => ({
    actions: {
      getWords: bindActionCreators(getWords, dispatch)
    }
  })
)(List)
