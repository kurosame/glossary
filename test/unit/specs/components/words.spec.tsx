import ConnectToWords, { Words } from '@/components/Words'
import { IStates } from '@/modules/states'
import { IWordState } from '@/modules/word'
import { mount, shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'

const state: { words: IWordState[] } = {
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
const states: IStates = { words: state.words }
const actions: any = {}

beforeEach(() => {
  actions.getWords = jest.fn()
})
afterEach(() => {
  actions.getWords.mockReset()
})

test('Call the getWords when words is nothing', () => {
  mount(<Words state={{ words: [] }} actions={actions} category={''} />)

  expect(actions.getWords).toBeCalled()
})

test('Not call the getWords when words exists', () => {
  mount(<Words state={state} actions={actions} category={''} />)

  expect(actions.getWords).not.toBeCalled()
})

test('Elements of the Words when category is nothing', () => {
  const wrapper = mount(<ConnectToWords category={''} />, {
    context: {
      store: configureStore()(states)
    }
  })

  expect(
    wrapper
      .find('[data-test="words"]')
      .first()
      .text()
  ).toEqual('Vue.jsVueVue.jsIt a Vue.jsReactReactIt a React')
})

test('Elements of the Words when category exists', () => {
  const wrapper = mount(<ConnectToWords category={'react'} />, {
    context: {
      store: configureStore()(states)
    }
  })

  expect(
    wrapper
      .find('[data-test="words"]')
      .first()
      .text()
  ).toEqual('ReactReactIt a React')
})

test('Elements of the Words when category not exists', () => {
  const wrapper = mount(<ConnectToWords category={'angular'} />, {
    context: {
      store: configureStore()(states)
    }
  })

  expect(
    wrapper
      .find('[data-test="words"]')
      .first()
      .text()
  ).toEqual('')
})

test('Match the snapshot when category is nothing', () => {
  const wrapper = shallow(<ConnectToWords category={''} />, {
    context: {
      store: configureStore()(states)
    }
  })

  expect(wrapper.html()).toMatchSnapshot()
})

test('Match the snapshot when category exists', () => {
  const wrapper = shallow(<ConnectToWords category={'react'} />, {
    context: {
      store: configureStore()(states)
    }
  })

  expect(wrapper.html()).toMatchSnapshot()
})

test('Match the snapshot when category not exists', () => {
  const wrapper = shallow(<ConnectToWords category={'angular'} />, {
    context: {
      store: configureStore()(states)
    }
  })

  expect(wrapper.html()).toMatchSnapshot()
})
