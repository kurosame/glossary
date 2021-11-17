import Category from '@/containers/Category'
import type { States } from '@/modules/states'
import { cleanup, render, RenderResult } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'

let wrapper: (isLogin: boolean) => RenderResult
beforeEach(() => {
  wrapper = (isLogin): RenderResult => {
    const store = configureStore<Pick<States, 'login'>>()({
      login: { isLogin }
    })
    return render(
      <Provider store={store}>
        <Router initialEntries={['/']}>
          <Category location={{ pathname: '/react' }} />
        </Router>
      </Provider>
    )
  }
})
afterEach(cleanup)

test('Render DOM if `isLogin` is true', () => {
  expect(wrapper(true).container.querySelector('div')).not.toBeNull()
})

test('Not render DOM if `isLogin` is false', () => {
  expect(wrapper(false).container.querySelector('div')).toBeNull()
})

test('Match the snapshot', () => {
  expect(wrapper(true).asFragment()).toMatchSnapshot()
})
