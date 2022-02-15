/**
 * @jest-environment jsdom
 */
import React from 'react'

import { cleanup, render, RenderResult } from '@testing-library/react'

import Loading from '@/components/Loading'

let wrapper: RenderResult
beforeEach(() => {
  wrapper = render(<Loading />)
})
afterEach(cleanup)

test('Match the snapshot', () => {
  expect(wrapper.asFragment()).toMatchSnapshot()
})
