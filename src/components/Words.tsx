import React, { useEffect, useState } from 'react'

import { Box, List, ListItem } from '@mui/material'

import SearchBar from '@/components/SearchBar'
import Word from '@/components/Word'
import type { WordState } from '@/modules/word'

interface Props {
  words: WordState[]
}

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
          <Box sx={{ width: '100%' }}>
            <Word word={w} />
          </Box>
        </ListItem>
      ))}
    </List>
  )
}

export default Words
