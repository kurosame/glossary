import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import AllowPush from '@/containers/AllowPush'
import Category from '@/containers/Category'
import List from '@/containers/List'
import Login from '@/containers/Login'
import '@/modules/states'
import store from '@/store'
import { initialize } from '@/sw/fcm'

initialize()

class RootComponent extends React.Component {
  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error({ 'error-boundary-error': error, errorInfo })
  }

  public render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={createMuiTheme()}>
          <Router>
            <>
              <Route path="/" component={Login} />
              <Route path="/" component={AllowPush} />
              <Route path="/" component={Category} />
              <Route path="/" component={List} exact />
              <Route path="/:category" component={List} exact />
            </>
          </Router>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

render(<RootComponent />, document.getElementById('root'))
