import Header from '@/containers/common/Header'
import Parent from '@/containers/Parent'
import store from '@/store'
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <>
        <Header />
        <Router>
          <Route path="/" component={Parent} exact />
        </Router>
      </>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
