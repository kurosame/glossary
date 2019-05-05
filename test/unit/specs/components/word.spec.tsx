import Word from '@/components/Word'
import { IWordState } from '@/modules/word'
import { mount } from 'enzyme'
import React from 'react'

const word: IWordState = {
  id: 'React',
  category: 'react',
  titles: ['React', 'React.js'],
  description: 'It a React'
}

const wrapper = mount(<Word word={word} />)

test('Data binding from word.id to CardHeader.title', () => {
  expect(
    wrapper
      .find('[data-test="id"]')
      .first()
      .text()
  ).toEqual('React')
})

test('Data binding from word.titles to CardContent', () => {
  expect(
    wrapper
      .find('[data-test="titles"]')
      .first()
      .text()
  ).toEqual('ReactReact.js')
})

test('Data binding from word.description to CardContent', () => {
  expect(
    wrapper
      .find('[data-test="description"]')
      .first()
      .text()
  ).toEqual('It a React')
})

test('Match the snapshot', () => {
  expect(wrapper.html()).toMatchSnapshot()
})
