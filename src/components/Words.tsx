import React, { useState, useCallback, ChangeEvent } from 'react'
import styled from 'styled-components'
import { List, ListItem } from '@material-ui/core'
import SearchBar from '@/components/SearchBar'
import Word from '@/components/Word'
import { WordState } from '@/modules/word'

interface Props {
  words: WordState[]
}

const WordDiv = styled.div`
  width: 100%;
`

const Words: React.FC<Props> = p => {
  const [filterWords, setFilterWords] = useState<WordState[] | undefined>(
    undefined
  )

  const onSearchWords = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const str = e.target.value.toLowerCase()
      const fWords = p.words.filter(
        w =>
          w.id.toLowerCase().includes(str) ||
          w.titles.some(t => t.toLowerCase().includes(str)) ||
          w.description.toLowerCase().includes(str)
      )
      setFilterWords(fWords)
    },
    [p.words]
  )

  return (
    <List data-testid="words">
      <ListItem>
        <SearchBar onSearch={onSearchWords} />
      </ListItem>
      {(filterWords || p.words).map(w => (
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
