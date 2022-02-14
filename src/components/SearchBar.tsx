import React from 'react'
import styled from 'styled-components'

import { Icon, Input, Paper } from '@material-ui/core'
import { Search } from '@material-ui/icons'

interface Props {
  onSearch: React.ChangeEventHandler<HTMLInputElement>
}

const StyledPaper = styled(Paper)`
  display: flex;
  align-items: center;
  width: 300px;
`
const StyledInput = styled(Input)`
  flex-grow: 1;
  margin-left: 10px;
`
const StyledIcon = styled(Icon)`
  margin: 10px;
`

const SearchBar: React.VFC<Props> = ({ onSearch }) => (
  <StyledPaper>
    <StyledInput placeholder="Search..." onChange={onSearch} inputProps={{ 'data-testid': 'search-bar-input' }} />
    <StyledIcon>
      <Search />
    </StyledIcon>
  </StyledPaper>
)

export default SearchBar
