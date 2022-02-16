/**
 * @jest-environment jsdom
 */
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import '@testing-library/jest-dom'
import { cleanup, render, RenderResult } from '@testing-library/react'

import List from '@/containers/List'
import type { States } from '@/modules/states'
import { GET_WORDS, WordState } from '@/modules/word'

let mockDispatch: jest.Mock
let wrapper: (isLogin: boolean, words: WordState[], category?: string) => RenderResult
beforeEach(() => {
  mockDispatch = jest.fn()
  wrapper = (isLogin, words, category): RenderResult => {
    const store = configureStore<States>()({
      login: { isLogin },
      words
    })
    store.dispatch = mockDispatch
    return render(
      <Provider store={store}>
        {category ? (
          <MemoryRouter initialEntries={[`/${category}`]}>
            <Routes>
              <Route path="/:category" element={<List />} />
            </Routes>
          </MemoryRouter>
        ) : (
          <List />
        )}
      </Provider>
    )
  }
})
afterEach(() => {
  cleanup()
  jest.restoreAllMocks()
})

test('Call `getWords` when `words` is empty', () => {
  wrapper(true, [])

  expect(mockDispatch).toBeCalled()
  expect(mockDispatch.mock.calls[0][0]).toEqual({ type: GET_WORDS })
  expect(mockDispatch.mock.calls[1]).toBeUndefined()
})

test('Not Call `getWords` when `words` exists', () => {
  wrapper(true, [
    {
      id: 'React',
      category: 'react',
      titles: ['React'],
      description: 'It a React'
    }
  ])

  expect(mockDispatch).not.toBeCalled()
})

test('Render DOM if `isLogin` is true', () => {
  expect(wrapper(true, []).container.querySelector('div')).not.toBeNull()
})

test('Not render DOM if `isLogin` is false', () => {
  expect(wrapper(false, []).container.querySelector('div')).toBeNull()
})

test('Output all `words` when `category` is empty', () => {
  expect(
    wrapper(true, [
      {
        id: 'React',
        category: 'react',
        titles: ['React'],
        description: 'It a React'
      },
      {
        id: 'Vue.js',
        category: 'vue',
        titles: ['Vue', 'Vuex'],
        description: 'It a Vue'
      }
    ]).container
  ).toHaveTextContent('ReactReactIt a ReactVue.jsVueVuexIt a Vue')
})

test('Output empty when `category` exists but not match', () => {
  expect(
    wrapper(
      true,
      [
        {
          id: 'React',
          category: 'react',
          titles: ['React'],
          description: 'It a React'
        },
        {
          id: 'Vue.js',
          category: 'vue',
          titles: ['Vue', 'Vuex'],
          description: 'It a Vue'
        }
      ],
      'angular'
    ).container
  ).toHaveTextContent('')
})

test('Match the snapshot', () => {
  expect(
    wrapper(true, [
      {
        id: 'React',
        category: 'react',
        titles: ['React'],
        description: 'It a React'
      },
      {
        id: 'Vue.js',
        category: 'vue',
        titles: ['Vue', 'Vuex'],
        description: 'It a Vue'
      }
    ]).asFragment()
  ).toMatchSnapshot()
})
