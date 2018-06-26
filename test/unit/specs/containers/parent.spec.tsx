import Parent from '@/containers/Parent'
import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'

const states = { counter: { count: 1, sagaCount: 2 } }

const wrapper = shallow(<Parent />, {
  context: { store: configureStore()(states) }
})

test('Match the snapshot', () => {
  // TODO: https://github.com/kurosame/react-boilerplate/issues/1
  expect(wrapper.html()).toMatchSnapshot()
})
