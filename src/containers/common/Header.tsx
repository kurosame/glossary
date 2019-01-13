import { AppBar, Tab, Tabs } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

interface IState {
  tabValue: number
}

export default class Header extends React.PureComponent<{}, IState> {
  constructor(props: {}) {
    super(props)
    this.state = { tabValue: 0 }
  }

  public tabChange = (_: React.ChangeEvent<{}>, v: number) =>
    this.setState({ tabValue: v })

  public render() {
    return (
      <AppBar position="static">
        <Tabs
          value={this.state.tabValue}
          scrollable={true}
          scrollButtons="off"
          onChange={this.tabChange}
          data-test="tabs"
        >
          <Tab label="Summary" component={(p: {}) => <Link to="/" {...p} />} />
          <Tab label="JS" component={(p: {}) => <Link to="/js" {...p} />} />
          <Tab
            label="React"
            component={(p: {}) => <Link to="/react" {...p} />}
          />
          <Tab
            label="Vue.js"
            component={(p: {}) => <Link to="/vue.js" {...p} />}
          />
          <Tab label="CSS" component={(p: {}) => <Link to="/css" {...p} />} />
          <Tab
            label="Swift"
            component={(p: {}) => <Link to="/swift" {...p} />}
          />
          <Tab
            label="Browser"
            component={(p: {}) => <Link to="/browser" {...p} />}
          />
          <Tab
            label="Package Manager"
            component={(p: {}) => <Link to="/package-manager" {...p} />}
          />
          <Tab
            label="Module Bundler"
            component={(p: {}) => <Link to="/module-bundler" {...p} />}
          />
          <Tab label="AWS" component={(p: {}) => <Link to="/aws" {...p} />} />
          <Tab
            label="Firebase"
            component={(p: {}) => <Link to="/firebase" {...p} />}
          />
          <Tab
            label="Apache"
            component={(p: {}) => <Link to="/apache" {...p} />}
          />
          <Tab
            label="Server"
            component={(p: {}) => <Link to="/server" {...p} />}
          />
          <Tab
            label="Words"
            component={(p: {}) => <Link to="/words" {...p} />}
          />
          <Tab
            label="Other"
            component={(p: {}) => <Link to="/other" {...p} />}
          />
        </Tabs>
      </AppBar>
    )
  }
}
