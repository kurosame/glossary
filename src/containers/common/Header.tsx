import { AppBar, Tab, Tabs } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  location: { pathname: string }
}

const tabItems: Array<{ label: string; to: string }> = [
  { label: 'Summary', to: '/' },
  { label: 'JS', to: '/js' },
  { label: 'React', to: '/react' },
  { label: 'Vue.js', to: '/vue' },
  { label: 'CSS', to: '/css' },
  { label: 'Swift', to: '/swift' },
  { label: 'Browser', to: '/browser' },
  { label: 'Package Manager', to: '/package-manager' },
  { label: 'Module Bundler', to: '/module-bundler' },
  { label: 'AWS', to: '/aws' },
  { label: 'Firebase', to: '/firebase' },
  { label: 'Apache', to: '/apache' },
  { label: 'Server', to: '/server' },
  { label: 'Words', to: '/words' },
  { label: 'Other', to: '/other' }
]

const Header = (props: IProps) => (
  <AppBar position="static">
    <Tabs
      value={tabItems.findIndex(o => o.to === props.location.pathname)}
      scrollable={true}
      scrollButtons="off"
      data-test="category-tabs"
    >
      {tabItems.map(t => (
        <Tab
          key={t.label}
          label={t.label}
          component={(p: {}) => <Link to={t.to} {...p} />}
        />
      ))}
    </Tabs>
  </AppBar>
)

export default Header
