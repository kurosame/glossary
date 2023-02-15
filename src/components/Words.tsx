import React, { useEffect, useState } from 'react'

import { Box as MBox, List, ListItem } from '@mui/material'
import { styled } from '@mui/system'

import SearchBar from '@/components/SearchBar'
import Word from '@/components/Word'
import type { WordState } from '@/modules/word'

interface Props {
  words: WordState[]
}

const Box = styled(MBox)`
  width: 100%;
`

const Words: React.FC<Props> = ({ words }) => {
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

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }

  return (
    <List data-testid="words">
      <ListItem>
        <SearchBar onSearch={onSearch} />
      </ListItem>
      {(filterWords || words).map(w => (
        <ListItem key={w.id}>
          <Box>
            <Word word={w} />
          </Box>
        </ListItem>
      ))}
    </List>
  )
}

export default Words
