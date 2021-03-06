import React from 'react'
import Word from '@/components/Word'
import { WordState } from '@/modules/word'
import { render, cleanup, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom'

let wrapper: RenderResult
beforeEach(() => {
  const word: WordState = {
    id: 'React',
    category: 'react',
    titles: ['React', 'React.js'],
    description: 'It a React'
  }
  wrapper = render(<Word word={word} />)
})
afterEach(() => {
  cleanup()
  jest.restoreAllMocks()
})

test('Data binding from `word.id` to `CardHeader.title`', () => {
  expect(wrapper.getByTestId('card-id')).toHaveTextContent('React')
})

test('Data binding from `word.titles` to `CardContent`', () => {
  expect(wrapper.getByTestId('card-titles')).toHaveTextContent('ReactReact.js')
})

test('Data binding from `word.description` to `CardContent`', () => {
  expect(wrapper.getByTestId('card-description')).toHaveTextContent(
    'It a React'
  )
})

test('Match the snapshot', () => {
  expect(wrapper.asFragment()).toMatchSnapshot()
})
