import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'

import { List, ListItem } from '@material-ui/core'

import SearchBar from '@/components/SearchBar'
import Word from '@/components/Word'
import type { WordState } from '@/modules/word'

interface Props {
  words: WordState[]
}

const WordDiv = styled.div`
  width: 100%;
`

const Words: React.VFC<Props> = ({ words }) => {
  const [searchWord, setSearchWord] = useState('')
  const [filterWords, setFilterWords] = useState<WordState[] | undefined>(undefined)

  useEffect(() => {
    const str = searchWord.toLowerCase()
    const fWords = words.filter(
      w =>
        w.id.toLowerCase().includes(str) ||
        w.titles.some(t => t.toLowerCase().includes(str)) ||
        w.description.toLowerCase().includes(str)
    )
    setFilterWords(fWords)
  }, [words, searchWord])

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }

  return (
    <List data-testid="words">
      <ListItem>
        <SearchBar onSearch={onSearch} />
      </ListItem>
      {(filterWords || words).map(w => (
        <ListItem key={w.id}>
          <WordDiv>
            <Word word={w} />
          </WordDiv>
        </ListItem>
      ))}
    </List>
  )
}

export default Words
