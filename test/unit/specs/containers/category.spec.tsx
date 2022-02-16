/**
 * @jest-environment jsdom
 */
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { cleanup, render, RenderResult } from '@testing-library/react'

import Category from '@/containers/Category'
import type { States } from '@/modules/states'

let wrapper: (isLogin: boolean) => RenderResult
beforeEach(() => {
  wrapper = (isLogin): RenderResult => {
    const store = configureStore<Pick<States, 'login'>>()({
      login: { isLogin }
    })
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/react']}>
          <Category />
        </MemoryRouter>
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
