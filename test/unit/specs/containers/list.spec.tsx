import List from '@/containers/List'
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'

const states = { words: [] }

const wrapper = shallow(<List />, {
  context: { store: configureStore()(states) }
})

test('Match the snapshot', () => {
  expect(wrapper.html()).toMatchSnapshot()
})
