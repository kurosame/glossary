import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Words from '@/components/Words'
import { States } from '@/modules/states'
import { getWords, WordActions, WordState } from '@/modules/word'

interface Props {
  state: { words: WordState[] }
  actions: WordActions
  match: { params: { category: string } }
}

export class List extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
    if (!props.state.words.length) {
      props.actions.getWords()
    }
  }

  public render(): JSX.Element {
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
  (states: States) => ({ state: { words: states.words } }),
  (dispatch: Dispatch) => ({
    actions: {
      getWords: bindActionCreators(getWords, dispatch)
    }
  })
)(List)
