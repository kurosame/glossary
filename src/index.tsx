import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import '@/modules/states'
import Router from '@/router'
import store from '@/store'
import { initializeSW } from '@/sw/fcm'

initializeSW()

class RootComponent extends React.Component {
  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error({ 'error-boundary-error': error, errorInfo })
  }

  public override render() {
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

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(<RootComponent />)
}
