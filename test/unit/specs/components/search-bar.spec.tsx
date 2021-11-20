/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, fireEvent, cleanup, RenderResult } from '@testing-library/react'
import SearchBar from '@/components/SearchBar'

let onSearch: jest.Mock
let wrapper: RenderResult
beforeEach(() => {
  onSearch = jest.fn()
  wrapper = render(<SearchBar onSearch={onSearch} />)
})
afterEach(() => {
  cleanup()
  jest.restoreAllMocks()
})

test('Run `onChange`', () => {
  fireEvent.change(wrapper.getByTestId('search-bar-input'), {
    target: { value: 'test' }
  })

  expect(onSearch).toBeCalled()
})

test('Match the snapshot', () => {
  expect(wrapper.asFragment()).toMatchSnapshot()
})
