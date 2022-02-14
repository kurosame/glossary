import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AllowPush from '@/containers/AllowPush'
import Category from '@/containers/Category'
import List from '@/containers/List'
import Login from '@/containers/Login'

const Router: React.VFC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <>
          <Login />
          <Category />
          <List />
          <AllowPush />
        </>
      }
    />
    <Route
      path="/:category"
      element={
        <>
          <Login />
          <Category />
          <List />
          <AllowPush />
        </>
      }
    />
  </Routes>
)

export default Router
