import Words from '@/components/Words'
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

test('Elements of the Words when category is nothing', () => {
  const wrapper = mount(<Words category={''} />, {
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
  const wrapper = mount(<Words category={'react'} />, {
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
  const wrapper = mount(<Words category={'angular'} />, {
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
  const wrapper = shallow(<Words category={''} />, {
    context: {
      store: configureStore()(states)
    }
  })

  expect(wrapper.html()).toMatchSnapshot()
})

test('Match the snapshot when category exists', () => {
  const wrapper = shallow(<Words category={'react'} />, {
    context: {
      store: configureStore()(states)
    }
  })

  expect(wrapper.html()).toMatchSnapshot()
})

test('Match the snapshot when category not exists', () => {
  const wrapper = shallow(<Words category={'angular'} />, {
    context: {
      store: configureStore()(states)
    }
  })

  expect(wrapper.html()).toMatchSnapshot()
})
