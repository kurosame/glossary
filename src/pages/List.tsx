import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Words from '@/components/Words'
import { States } from '@/modules/states'
import { LoginState } from '@/modules/login'
import { getWords, WordActions, WordState } from '@/modules/word'

interface Props {
  state: { login: LoginState; words: WordState[] }
  actions: Pick<WordActions, 'getWords'>
  match: { params: { category: string } }
  store?: unknown
}

export class List extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
    if (!props.state.words.length) {
      props.actions.getWords()
    }
  }

  public render(): JSX.Element | null {
    if (!this.props.state.login.isLogin) return null
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
  (states: States) => ({ state: { login: states.login, words: states.words } }),
  (dispatch: Dispatch) => ({
    actions: {
      getWords: bindActionCreators(getWords, dispatch)
    }
  })
)(List)
