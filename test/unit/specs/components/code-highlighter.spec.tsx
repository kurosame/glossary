/**
 * @jest-environment jsdom
 */
import React from 'react'

import { cleanup, render, RenderResult } from '@testing-library/react'

import CodeHighlighter from '@/components/CodeHighlighter'

let wrapper: RenderResult
beforeEach(() => {
  wrapper = render(<CodeHighlighter language="js">{['']}</CodeHighlighter>)
})
afterEach(cleanup)

test('Match the snapshot', () => {
  expect(wrapper.asFragment()).toMatchSnapshot()
})
