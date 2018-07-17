import Words from '@/components/Words'
import { shallow } from 'enzyme'
import React from 'react'

const words = [
  {
    id: 'Vue.js',
    category: 'Vue.js',
    titles: ['Vue', 'Vue.js'],
    descriptions: ['It a ', 'Vue.js']
  }
]

const wrapper = shallow(<Words words={words} />)

test('Match the snapshot', () => {
  expect(wrapper.html()).toMatchSnapshot()
})
