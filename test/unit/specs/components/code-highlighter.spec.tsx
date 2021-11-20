/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, cleanup, RenderResult } from '@testing-library/react'
import CodeHighlighter from '@/components/CodeHighlighter'

let wrapper: RenderResult
beforeEach(() => {
  wrapper = render(<CodeHighlighter value="test" language="javascript" />)
})
afterEach(cleanup)

test('Match the snapshot', () => {
  expect(wrapper.asFragment()).toMatchSnapshot()
})
