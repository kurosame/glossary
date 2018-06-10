import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import { env } from './firebase'

const firebaseApp = firebase.initializeApp(env)
const firestore = firebaseApp.firestore()

function aaa() {
  firestore
    .collection('words')
    .get()
    .then(snapShot => {
      let tasks = []
      snapShot.forEach(doc => {
        tasks.push({
          id: doc.id,
          text: doc.data().title
        })
      })
      console.log(tasks)
    })
}

class App extends React.Component {
  componentDidMount() {
    aaa()
  }

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

render(<App />, document.getElementById('root'))
