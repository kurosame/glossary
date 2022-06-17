import React from 'react'

import { Search } from '@mui/icons-material'
import { Input, Paper } from '@mui/material'

interface Props {
  onSearch: React.ChangeEventHandler<HTMLInputElement>
}

const SearchBar: React.FC<Props> = ({ onSearch }) => (
  <Paper sx={{ display: 'flex', alignItems: 'center', width: 300 }}>
    <Input
      placeholder="Search..."
      sx={{ flexGrow: 1, ml: 1 }}
      inputProps={{ 'data-testid': 'search-bar-input' }}
      onChange={onSearch}
    />
    <Search sx={{ m: 1 }} />
  </Paper>
)

export default SearchBar
