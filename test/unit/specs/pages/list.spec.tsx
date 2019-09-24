import Words from '@/components/Words'
import ConnectToList, { List } from '@/pages/List'
import { States } from '@/modules/states'
import { LoginState } from '@/modules/login'
import { WordState } from '@/modules/word'
import { mount, shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'

const login: LoginState = { isLogin: true }
const words: WordState[] = [
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
const states: States = { login, words }
const actions: { getWords: jest.Mock } = { getWords: jest.fn() }

beforeEach(() => {
  actions.getWords = jest.fn()
})
afterEach(() => {
  actions.getWords.mockReset()
})

describe('Call the getWords', () => {
  test('Call the getWords when words is nothing', () => {
    shallow(
      <List
        state={{ login, words: [] }}
        actions={actions}
        match={{ params: { category: '' } }}
      />
    )

    expect(actions.getWords).toBeCalled()
  })

  test('Not call the getWords when words exists', () => {
    shallow(
      <List
        state={states}
        actions={actions}
        match={{ params: { category: '' } }}
      />
    )

    expect(actions.getWords).not.toBeCalled()
  })
})

describe('Elements of the Words', () => {
  test('category is nothing', () => {
    const wrapper = mount(
      <ConnectToList
        match={{ params: { category: '' } }}
        store={configureStore<States>()(states)}
      />
    )

    expect(
      wrapper
        .find(Words)
        .first()
        .text()
    ).toEqual('Vue.jsVueVue.jsIt a Vue.jsReactReactIt a React')
  })

  test('category exists', () => {
    const wrapper = mount(
      <ConnectToList
        match={{ params: { category: 'react' } }}
        store={configureStore<States>()(states)}
      />
    )

    expect(
      wrapper
        .find(Words)
        .first()
        .text()
    ).toEqual('ReactReactIt a React')
  })

  test('category not exists', () => {
    const wrapper = mount(
      <ConnectToList
        match={{ params: { category: 'angular' } }}
        store={configureStore<States>()(states)}
      />
    )

    expect(
      wrapper
        .find(Words)
        .first()
        .text()
    ).toEqual('')
  })

  test('isLogin is false', () => {
    const wrapper = shallow(
      <ConnectToList
        match={{ params: { category: '' } }}
        store={configureStore<States>()({
          ...states,
          login: { isLogin: false }
        })}
      />
    )

    expect(wrapper.html()).toEqual('')
  })
})

describe('Match the snapshot', () => {
  test('category is nothing', () => {
    const wrapper = shallow(
      <ConnectToList
        match={{ params: { category: '' } }}
        store={configureStore<States>()(states)}
      />
    )

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('category exists', () => {
    const wrapper = shallow(
      <ConnectToList
        match={{ params: { category: 'react' } }}
        store={configureStore<States>()(states)}
      />
    )

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('category not exists', () => {
    const wrapper = shallow(
      <ConnectToList
        match={{ params: { category: 'angular' } }}
        store={configureStore<States>()(states)}
      />
    )

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('isLogin is false', () => {
    const wrapper = shallow(
      <ConnectToList
        match={{ params: { category: '' } }}
        store={configureStore<States>()({
          ...states,
          login: { isLogin: false }
        })}
      />
    )

    expect(wrapper.html()).toMatchSnapshot()
  })
})
