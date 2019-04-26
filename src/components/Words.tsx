import SearchBar from '@/components/SearchBar'
import Word from '@/components/Word'
import { IWordState } from '@/modules/word'
import { List, ListItem } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  words: IWordState[]
}

interface IState {
  filterWords: IWordState[] | undefined
}

class Words extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      filterWords: undefined
    }
  }

  public setFilterWords(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ filterWords: e.target.value ? [] : undefined })
  }

  public render() {
    return (
      <List data-test="words">
        <ListItem>
          <SearchBar onSearch={e => this.setFilterWords(e)} />
        </ListItem>
        {this.state.filterWords ||
          this.props.words.map(w => (
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
export default Words
