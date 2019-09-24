import Category from '@/pages/Category'
import { shallow } from 'enzyme'
import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'

const wrapper = shallow(
  <Router initialEntries={['/']}>
    <Category location={{ pathname: '/react' }} />
  </Router>
)

test('Match the snapshot', () => {
  expect(wrapper.html()).toMatchSnapshot()
})
