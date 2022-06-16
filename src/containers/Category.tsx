import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { AppBar, Tab, Tabs } from '@mui/material'

import type { States } from '@/modules/states'

const tabItems: Array<{ label: string; to: string }> = [
  { label: 'Summary', to: '/' },
  { label: 'Apache', to: '/apache' },
  { label: 'Architecture', to: '/architecture' },
  { label: 'AWS', to: '/aws' },
  { label: 'Browser', to: '/browser' },
  { label: 'Build', to: '/build' },
  { label: 'CI', to: '/ci' },
  { label: 'Compiler', to: '/compiler' },
  { label: 'CSS', to: '/css' },
  { label: 'DB', to: '/db' },
  { label: 'Design', to: '/design' },
  { label: 'Docker', to: '/docker' },
  { label: 'Firebase', to: '/firebase' },
  { label: 'Go', to: '/go' },
  { label: 'Hardware', to: '/hardware' },
  { label: 'HTML', to: '/html' },
  { label: 'JS', to: '/js' },
  { label: 'Language', to: '/language' },
  { label: 'ML', to: '/ml' },
  { label: 'Mobile', to: '/mobile' },
  { label: 'Monitoring', to: '/monitoring' },
  { label: 'Network', to: '/network' },
  { label: 'Package Manager', to: '/package-manager' },
  { label: 'Programming', to: '/programming' },
  { label: 'Python', to: '/python' },
  { label: 'React', to: '/react' },
  { label: 'Scala', to: '/scala' },
  { label: 'Server', to: '/server' },
  { label: 'Swift', to: '/swift' },
  { label: 'Vue.js', to: '/vue' },
  { label: 'Words', to: '/words' },
  { label: 'Workflow Engine', to: '/workflow-engine' }
]

const Category: React.VFC = () => {
  const isLogin = useSelector<States, boolean>(s => s.login.isLogin)
  const location = useLocation()

  if (!isLogin) return null
  return (
    <AppBar position="static">
      <Tabs value={tabItems.findIndex(o => o.to === location.pathname)} variant="scrollable">
        {tabItems.map(t => {
          const StaticLink = React.forwardRef<HTMLAnchorElement>((p, ref) => <Link ref={ref} to={t.to} {...p} />)
          StaticLink.displayName = 'StaticLink'
          return <Tab key={t.label} label={t.label} component={StaticLink} />
        })}
      </Tabs>
    </AppBar>
  )
}

export default Category
