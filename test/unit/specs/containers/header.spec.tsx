import Header from '@/containers/common/Header'
import { shallow } from 'enzyme'
import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'

const wrapper = shallow(
  <Router initialEntries={['/']}>
    <Header location={{ pathname: '/react' }} />
  </Router>
)

test('Match the snapshot', () => {
  expect(wrapper.html()).toMatchSnapshot()
})
