import React from 'react'
import styled from 'styled-components'
import { List, ListItem } from '@material-ui/core'
import SearchBar from '@/components/SearchBar'
import Word from '@/components/Word'
import { WordState } from '@/modules/word'

interface Props {
  words: WordState[]
}

interface State {
  filterWords: WordState[] | undefined
}

class Words extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      filterWords: undefined
    }
    this.setFilterWords = this.setFilterWords.bind(this)
  }

  public setFilterWords(e: React.ChangeEvent<HTMLInputElement>): void {
    const searchString = e.target.value.toLowerCase()
    const filterWords = this.props.words.filter(
      w =>
        w.id.toLowerCase().includes(searchString) ||
        w.titles.some(t => t.toLowerCase().includes(searchString)) ||
        w.description.toLowerCase().includes(searchString)
    )
    this.setState({ filterWords })
  }

  public render(): JSX.Element {
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
