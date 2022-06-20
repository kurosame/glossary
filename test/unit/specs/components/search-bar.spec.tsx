/**
 * @jest-environment jsdom
 */
import React from 'react'

import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'

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

test('Run `onBlur`', () => {
  fireEvent.focusOut(wrapper.getByTestId('search-bar-input'))

  expect(onSearch).toBeCalled()
})

test('Run `onKeyUp to Enter`', () => {
  fireEvent.keyUp(wrapper.getByTestId('search-bar-input'), { key: 'Enter' })

  expect(onSearch).toBeCalled()
})

test('Match the snapshot', () => {
  expect(wrapper.asFragment()).toMatchSnapshot()
})
