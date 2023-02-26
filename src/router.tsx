import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loading from '@/components/Loading'

const Login = React.lazy(() => import('@/containers/Login'))
const Category = React.lazy(() => import('@/containers/Category'))
const List = React.lazy(() => import('@/containers/List'))
const AllowPush = React.lazy(() => import('@/containers/AllowPush'))
const ToTop = React.lazy(() => import('@/containers/ToTop'))

const Page: React.FC = () => (
  <>
    <Login />
    <Category />
    <List />
    <AllowPush />
    <ToTop />
  </>
)

const Router: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <Suspense fallback={<Loading />}>
          <Page />
        </Suspense>
      }
    />
    <Route
      path="/:category"
      element={
        <Suspense fallback={<Loading />}>
          <Page />
        </Suspense>
      }
    />
  </Routes>
)

export default Router
