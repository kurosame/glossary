import SearchBar from '@/components/SearchBar'
import { mount } from 'enzyme'
import React from 'react'

const onSearch: jest.Mock = jest.fn()

const wrapper = mount(<SearchBar onSearch={onSearch} />)

test('Run onChange', () => {
  wrapper
    .find('[data-test="search-bar-input"]')
    .first()
    .prop('onChange')!({} as React.ChangeEvent<HTMLInputElement>)

  expect(onSearch).toBeCalled()
})

test('Match the snapshot', () => {
  expect(wrapper.html()).toMatchSnapshot()
})
