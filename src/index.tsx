import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

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
          <MuiThemeProvider theme={createMuiTheme()}>
            <Router />
          </MuiThemeProvider>
        </Provider>
      </BrowserRouter>
    )
  }
}

render(<RootComponent />, document.getElementById('root'))
