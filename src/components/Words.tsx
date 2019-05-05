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
    this.setFilterWords = this.setFilterWords.bind(this)
  }

  public setFilterWords(e: React.ChangeEvent<HTMLInputElement>) {
    const searchString = e.target.value.toLowerCase()
    const filterWords = this.props.words.filter(
      w =>
        w.id.toLowerCase().includes(searchString) ||
        w.titles.some(t => t.toLowerCase().includes(searchString)) ||
        w.description.toLowerCase().includes(searchString)
    )
    this.setState({ filterWords })
  }

  public render() {
    return (
      <List data-test="words">
        <ListItem>
          <SearchBar onSearch={this.setFilterWords} />
        </ListItem>
        {(this.state.filterWords || this.props.words).map(w => (
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
