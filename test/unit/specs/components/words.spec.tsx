import React from 'react'
import Words from '@/components/Words'
import { WordState } from '@/modules/word'
import { render, fireEvent, cleanup, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom'

let wrapper: RenderResult
beforeEach(() => {
  const words: WordState[] = [
    {
      id: 'Vue.js',
      category: 'vue',
      titles: ['Vue', 'Vuex'],
      description: 'It a Vue'
    },
    {
      id: 'React',
      category: 'react',
      titles: ['React'],
      description: 'It a React'
    }
  ]
  wrapper = render(<Words words={words} />)
})
afterEach(cleanup)

test('Output `props.words` when `filterWords` is undefined', () => {
  expect(wrapper.getByTestId('words')).toHaveTextContent('Vue.jsVueVuexIt a VueReactReactIt a React')
})

test('Filter and output `props.words` when `filterWords` matches `words.id`', () => {
  fireEvent.change(wrapper.getByTestId('search-bar-input'), {
    target: { value: 'Vue.js' }
  })

  expect(wrapper.getByTestId('words')).toHaveTextContent('Vue.jsVueVuexIt a Vue')
})

test('Filter and output `props.words` when `filterWords` matches `words.titles`', () => {
  fireEvent.change(wrapper.getByTestId('search-bar-input'), {
    target: { value: 'uex' }
  })

  expect(wrapper.getByTestId('words')).toHaveTextContent('Vue.jsVueVuexIt a Vue')
})

test('Filter and output `props.words` when `filterWords` matches `words.description`', () => {
  fireEvent.change(wrapper.getByTestId('search-bar-input'), {
    target: { value: 'It ' }
  })

  expect(wrapper.getByTestId('words')).toHaveTextContent('Vue.jsVueVuexIt a VueReactReactIt a React')
})

test('Output empty when `filterWords` not match', () => {
  fireEvent.change(wrapper.getByTestId('search-bar-input'), {
    target: { value: 'angular' }
  })

  expect(wrapper.getByTestId('words')).toHaveTextContent('')
})

test('Match the snapshot', () => {
  expect(wrapper.asFragment()).toMatchSnapshot()
})
