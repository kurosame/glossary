import { AppBar, Tab, Tabs } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

interface IState {
  tabValue: number
}

export default class Header extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props)
    this.state = { tabValue: 0 }
  }

  public tabChange = (e: React.ChangeEvent<{}>, v: number) =>
    this.setState({ tabValue: v })

  public render() {
    return (
      <AppBar position="static">
        <Tabs value={this.state.tabValue} onChange={this.tabChange}>
          <Tab label="List" component={(p: {}) => <Link to="/" {...p} />} />
        </Tabs>
      </AppBar>
    )
  }
}
