import React from 'react'

import { Box as MBox, CircularProgress } from '@mui/material'
import { styled } from '@mui/system'

const Box = styled(MBox)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const Loading: React.FC = () => (
  <Box>
    <CircularProgress />
  </Box>
)

export default Loading
