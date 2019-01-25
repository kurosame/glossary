import Word from '@/components/Word'
import { IStates } from '@/modules/states'
import { getWords, IWordActions, IWordState } from '@/modules/word'
import { List, ListItem } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import styled from 'styled-components'

interface IProps {
  state: { words: IWordState[] }
  actions: IWordActions
  category: string
}

export class Words extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props)
    if (!props.state.words.length) {
      props.actions.getWords()
    }
  }

  public render() {
    return (
      <List data-test="words">
        {this.props.state.words
          .filter(
            w => !this.props.category || w.category === this.props.category
          )
          .map(w => (
            <ListItem key={w.id}>
              <WordDiv>
                <Word word={w} />
              </WordDiv>
            </ListItem>
          ))}
      </List>
    )
  }
}

const WordDiv = styled.div`
  width: 100%;
`

export default connect(
  (states: IStates) => ({ state: { words: states.words } }),
  (dispatch: Dispatch) => ({
    actions: {
      getWords: bindActionCreators(getWords, dispatch)
    }
  })
)(Words)
