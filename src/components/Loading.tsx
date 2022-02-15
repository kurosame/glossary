import React from 'react'
import styled from 'styled-components'

import { CircularProgress } from '@material-ui/core'

const ProgressDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Loading: React.VFC = () => (
  <ProgressDiv>
    <CircularProgress />
  </ProgressDiv>
)

export default Loading
