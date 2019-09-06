import Words from '@/components/Words'
import { WordState } from '@/modules/word'
import { mount } from 'enzyme'
import React from 'react'

const words: WordState[] = [
  {
    id: 'Vue.js',
    category: 'vue',
    titles: ['Vue', 'Vuex'],
    description: 'It a Vue.js'
  },
  {
    id: 'React',
    category: 'react',
    titles: ['React'],
    description: 'It a React'
  }
]

const wrapper = mount(<Words words={words} />)

test('Used props.words when filterWords is undefined', () => {
  wrapper.setState({ filterWords: undefined })

  expect(
    wrapper
      .find('[data-test="words"]')
      .first()
      .text()
  ).toEqual('Vue.jsVueVuexIt a Vue.jsReactReactIt a React')
})

test('Used filterWords when filterWords exists', () => {
  wrapper.setState({
    filterWords: [
      {
        id: 'JS',
        category: 'js',
        titles: ['JS'],
        description: 'It a JS'
      }
    ]
  })

  expect(
    wrapper
      .find('[data-test="words"]')
      .first()
      .text()
  ).toEqual('JSJSIt a JS')
})

describe('Run setFilterWords', () => {
  const instance = wrapper.instance() as Words

  test('Search string matches words.id', () => {
    instance.setFilterWords({
      target: { value: 'Vue.js' }
    } as React.ChangeEvent<HTMLInputElement>)

    expect(wrapper.state()).toEqual({
      filterWords: [
        {
          id: 'Vue.js',
          category: 'vue',
          titles: ['Vue', 'Vuex'],
          description: 'It a Vue.js'
        }
      ]
    })
  })

  test('Search string matches words.titles', () => {
    instance.setFilterWords({
      target: { value: 'uex' }
    } as React.ChangeEvent<HTMLInputElement>)

    expect(wrapper.state()).toEqual({
      filterWords: [
        {
          id: 'Vue.js',
          category: 'vue',
          titles: ['Vue', 'Vuex'],
          description: 'It a Vue.js'
        }
      ]
    })
  })

  test('Search string matches words.description', () => {
    instance.setFilterWords({
      target: { value: 'It ' }
    } as React.ChangeEvent<HTMLInputElement>)

    expect(wrapper.state()).toEqual({
      filterWords: [
        {
          id: 'Vue.js',
          category: 'vue',
          titles: ['Vue', 'Vuex'],
          description: 'It a Vue.js'
        },
        {
          id: 'React',
          category: 'react',
          titles: ['React'],
          description: 'It a React'
        }
      ]
    })
  })

  test('Search string not match', () => {
    instance.setFilterWords({
      target: { value: 'not match' }
    } as React.ChangeEvent<HTMLInputElement>)

    expect(wrapper.state()).toEqual({ filterWords: [] })
  })
})

test('Match the snapshot', () => {
  expect(wrapper.html()).toMatchSnapshot()
})
