import List from '@/containers/List'
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'

const states = {
  words: [{ category: 'firebase', titles: [], descriptions: [] }]
}

test('Match the snapshot when category exists', () => {
  const wrapper = shallow(
    <List match={{ params: { category: 'firebase' } }} />,
    {
      context: { store: configureStore()(states) }
    }
  )

  expect(wrapper.html()).toMatchSnapshot()
})

test('Match the snapshot when category is nothing', () => {
  const wrapper = shallow(<List match={{ params: { category: '' } }} />, {
    context: { store: configureStore()(states) }
  })

  expect(wrapper.html()).toMatchSnapshot()
})
