import List from '@/containers/List'
import { shallow } from 'enzyme'
import React from 'react'

const wrapper = shallow(<List match={{ params: { category: '' } }} />)

test('Match the snapshot', () => {
  expect(wrapper.debug()).toMatchSnapshot()
})
