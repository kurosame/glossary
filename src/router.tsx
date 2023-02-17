import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loading from '@/components/Loading'

const LoginPage = React.lazy(() => import('@/containers/Login'))
const CategoryPage = React.lazy(() => import('@/containers/Category'))
const ListPage = React.lazy(() => import('@/containers/List'))
const AllowPushPage = React.lazy(() => import('@/containers/AllowPush'))
const ToTop = React.lazy(() => import('@/containers/ToTop'))

const Router: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <Suspense fallback={<Loading />}>
          <LoginPage />
          <CategoryPage />
          <ListPage />
          <AllowPushPage />
          <ToTop />
        </Suspense>
      }
    />
    <Route
      path="/:category"
      element={
        <Suspense fallback={<Loading />}>
          <LoginPage />
          <CategoryPage />
          <ListPage />
          <AllowPushPage />
          <ToTop />
        </Suspense>
      }
    />
  </Routes>
)

export default Router
