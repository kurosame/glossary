import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import List from '@/containers/List'
import { WordState, GET_WORDS } from '@/modules/word'
import { States } from '@/modules/states'
import { render, cleanup, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom'

let mockDispatch: jest.Mock
let wrapper: (
  isLogin: boolean,
  words: WordState[],
  match: { params: { category: string } }
) => RenderResult
beforeEach(() => {
  mockDispatch = jest.fn()
  wrapper = (
    isLogin: boolean,
    words: WordState[],
    match: { params: { category: string } }
  ): RenderResult => {
    const store = configureStore<States>()({
      login: { isLogin },
      words
    })
    store.dispatch = mockDispatch
    return render(
      <Provider store={store}>
        <List match={match} />
      </Provider>
    )
  }
})
afterEach(() => {
  cleanup()
  jest.restoreAllMocks()
})

test('Call `getWords` when `words` is empty', () => {
  wrapper(true, [], { params: { category: '' } })

  expect(mockDispatch).toBeCalled()
  expect(mockDispatch.mock.calls[0][0]).toEqual({ type: GET_WORDS })
  expect(mockDispatch.mock.calls[1]).toBeUndefined()
})

test('Not Call `getWords` when `words` exists', () => {
  wrapper(
    true,
    [
      {
        id: 'React',
        category: 'react',
        titles: ['React'],
        description: 'It a React'
      }
    ],
    { params: { category: '' } }
  )

  expect(mockDispatch).not.toBeCalled()
})

test('Render DOM if `isLogin` is true', () => {
  expect(
    wrapper(true, [], { params: { category: '' } }).container.querySelector(
      'div'
    )
  ).not.toBeNull()
})

test('Not render DOM if `isLogin` is false', () => {
  expect(
    wrapper(false, [], { params: { category: '' } }).container.querySelector(
      'div'
    )
  ).toBeNull()
})

test('Output all `words` when `category` is empty', () => {
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
      { params: { category: '' } }
    ).container
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
      { params: { category: 'angular' } }
    ).container
  ).toHaveTextContent('')
})

test('Match the snapshot', () => {
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
      { params: { category: '' } }
    ).asFragment()
  ).toMatchSnapshot()
})
