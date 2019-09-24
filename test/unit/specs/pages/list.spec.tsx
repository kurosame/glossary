import Words from '@/components/Words'
import ConnectToList, { List } from '@/pages/List'
import { States } from '@/modules/states'
import { WordState } from '@/modules/word'
import { mount, shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'

const state: { words: WordState[] } = {
  words: [
    {
      id: 'Vue.js',
      category: 'vue',
      titles: ['Vue', 'Vue.js'],
      description: 'It a Vue.js'
    },
    {
      id: 'React',
      category: 'react',
      titles: ['React'],
      description: 'It a React'
    }
  ]
}
const states: States = { login: { isLogin: false }, words: state.words }
const actions: any = {}

beforeEach(() => {
  actions.getWords = jest.fn()
})
afterEach(() => {
  actions.getWords.mockReset()
})

test('Call the getWords when words is nothing', () => {
  shallow(
    <List
      state={{ login: { isLogin: false }, words: [] }}
      actions={actions}
      match={{ params: { category: '' } }}
    />
  )

  expect(actions.getWords).toBeCalled()
})

test('Not call the getWords when words exists', () => {
  shallow(
    <List
      state={{ login: { isLogin: false }, ...state }}
      actions={actions}
      match={{ params: { category: '' } }}
    />
  )

  expect(actions.getWords).not.toBeCalled()
})

test('Elements of the Words when category is nothing', () => {
  const wrapper = mount(
    <ConnectToList match={{ params: { category: '' } }} />,
    {
      context: {
        store: configureStore()(states)
      }
    }
  )

  expect(
    wrapper
      .find(Words)
      .first()
      .text()
  ).toEqual('Vue.jsVueVue.jsIt a Vue.jsReactReactIt a React')
})

test('Elements of the Words when category exists', () => {
  const wrapper = mount(
    <ConnectToList match={{ params: { category: 'react' } }} />,
    {
      context: {
        store: configureStore()(states)
      }
    }
  )

  expect(
    wrapper
      .find(Words)
      .first()
      .text()
  ).toEqual('ReactReactIt a React')
})

test('Elements of the Words when category not exists', () => {
  const wrapper = mount(
    <ConnectToList match={{ params: { category: 'angular' } }} />,
    {
      context: {
        store: configureStore()(states)
      }
    }
  )

  expect(
    wrapper
      .find(Words)
      .first()
      .text()
  ).toEqual('')
})

test('Match the snapshot when category is nothing', () => {
  const wrapper = shallow(
    <ConnectToList match={{ params: { category: '' } }} />,
    {
      context: {
        store: configureStore()(states)
      }
    }
  )

  expect(wrapper.html()).toMatchSnapshot()
})

test('Match the snapshot when category exists', () => {
  const wrapper = shallow(
    <ConnectToList match={{ params: { category: 'react' } }} />,
    {
      context: {
        store: configureStore()(states)
      }
    }
  )

  expect(wrapper.html()).toMatchSnapshot()
})

test('Match the snapshot when category not exists', () => {
  const wrapper = shallow(
    <ConnectToList match={{ params: { category: 'angular' } }} />,
    {
      context: {
        store: configureStore()(states)
      }
    }
  )

  expect(wrapper.html()).toMatchSnapshot()
})
