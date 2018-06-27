import Tabs, { Tab } from 'material-ui/Tabs'
import React from 'react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  public render() {
    return (
      <Tabs>
        <Tab containerElement={<Link to="/" />} label="List" />
      </Tabs>
    )
  }
}
