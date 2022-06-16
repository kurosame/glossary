import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import '@/modules/states'
import Router from '@/router'
import store from '@/store'
import { initialize } from '@/sw/fcm'

initialize()

class RootComponent extends React.Component {
  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error({ 'error-boundary-error': error, errorInfo })
  }

  public render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
            <CssBaseline />
            <Router />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    )
  }
}

render(<RootComponent />, document.getElementById('root'))
