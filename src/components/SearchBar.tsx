import React from 'react'

import { Search } from '@mui/icons-material'
import { Input as MInput, Paper as MPaper } from '@mui/material'
import { styled } from '@mui/system'

interface Props {
  onSearch: React.ReactEventHandler
}

const Paper = styled(MPaper)`
  display: flex;
  align-items: center;
  width: 300px;
`

const Input = styled(MInput)`
  flex-grow: 1;
`

const SearchBar: React.FC<Props> = ({ onSearch }) => (
  <Paper>
    <Input
      placeholder="Search..."
      sx={{ ml: 1 }}
      inputProps={{ 'data-testid': 'search-bar-input' }}
      onBlur={onSearch}
      onKeyUp={e => {
        if (e.key === 'Enter') onSearch(e)
      }}
    />
    <Search sx={{ m: 1 }} />
  </Paper>
)

export default SearchBar
