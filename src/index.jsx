import React from 'react'
import { render } from 'react-dom'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Card>
          <CardHeader title="Without Avatar" subtitle="Subtitle" />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec
            vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
            pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque
            lobortis odio.
          </CardText>
        </Card>
      </MuiThemeProvider>
    )
  }
}

render(<App />, document.getElementById('app'))
