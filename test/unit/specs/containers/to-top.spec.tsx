/**
 * @jest-environment jsdom
 */
import React from 'react'

import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'

import ToTop from '@/containers/ToTop'

let wrapper: RenderResult
beforeEach(() => {
  wrapper = render(<ToTop />)
  window.scroll = jest.fn()
})
afterEach(cleanup)

test('Match the snapshot', () => {
  expect(wrapper.asFragment()).toMatchSnapshot()
})

test('Match the snapshot when click', () => {
  fireEvent.click(wrapper.getByTestId('to-top'))

  expect(wrapper.asFragment()).toMatchSnapshot()
})
