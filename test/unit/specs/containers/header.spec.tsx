import Header from '@/containers/common/Header'
import { shallow } from 'enzyme'
import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'

const wrapper = shallow(<Header />)
const wrapperRouter = shallow(
  <Router initialEntries={['/']}>
    <Header />
  </Router>
)

test('The state is initialized in the constructor', () => {
  expect(wrapper.state('tabValue')).toEqual(0)
})

test('Change the tabs will set the state.tabValue', () => {
  wrapper.find('.tabs').simulate('change', {}, 1)

  expect(wrapper.state('tabValue')).toEqual(1)
})

test('Match the snapshot', () => {
  expect(wrapperRouter.html()).toMatchSnapshot()
})
