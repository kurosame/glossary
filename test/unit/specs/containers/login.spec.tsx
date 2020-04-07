import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Login from '@/containers/Login'
import firebaseApp from '@/firebase/index'
import { SET_IS_LOGIN } from '@/modules/login'
import { States } from '@/modules/states'
import { render, cleanup, RenderResult } from '@testing-library/react'

let mockDispatch: jest.Mock
let spyFirebaseAuth: jest.SpyInstance
let wrapper: (isLogin: boolean) => RenderResult
beforeEach(() => {
  mockDispatch = jest.fn()
  spyFirebaseAuth = jest.spyOn(firebaseApp.auth(), 'onAuthStateChanged')
  wrapper = (isLogin: boolean): RenderResult => {
    const store = configureStore<Pick<States, 'login'>>()({
      login: { isLogin }
    })
    store.dispatch = mockDispatch
    return render(
      <Provider store={store}>
        <Login />
      </Provider>
    )
  }
})
afterEach(() => {
  cleanup()
  jest.restoreAllMocks()
})

test('Call `useSetUser`', () => {
  wrapper(true)

  expect(spyFirebaseAuth).toBeCalled()
})

test('Call `useSetIsLogin`', () => {
  wrapper(true)

  expect(mockDispatch).toBeCalled()
  expect(mockDispatch.mock.calls[0][0]).toEqual({
    type: SET_IS_LOGIN,
    payload: { isLogin: false }
  })
  expect(mockDispatch.mock.calls[1]).toBeUndefined()
})

test('Render DOM if `isLogin` is false', async () => {
  // FirebaseUI for React is not supported by Jest(jsdom)
  // https://github.com/firebase/firebaseui-web/issues/636
  // expect(wrapper(false).container.querySelector('div')).not.toBeNull()
})

test('Not render DOM if `isLogin` is true', () => {
  expect(wrapper(true).container.querySelector('div')).toBeNull()
})

test('Match the snapshot', () => {
  // FirebaseUI for React is not supported by Jest(jsdom)
  // https://github.com/firebase/firebaseui-web/issues/636
  // expect(wrapper(false).asFragment()).toMatchSnapshot()
})
