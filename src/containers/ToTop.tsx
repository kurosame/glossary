import React from 'react'

import { KeyboardArrowUp } from '@mui/icons-material'
import { Box as MBox, Fab, useScrollTrigger, Zoom } from '@mui/material'
import { styled } from '@mui/system'

const Box = styled(MBox)`
  position: fixed;
  right: 32px;
  bottom: 32px;
`

const ToTop: React.FC = () => (
  <Zoom in={useScrollTrigger({ disableHysteresis: true })}>
    <Box>
      <Fab
        color="primary"
        size="small"
        data-testid="to-top"
        onClick={() => {
          window.scroll({ top: 0 })
        }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Box>
  </Zoom>
)

export default ToTop
