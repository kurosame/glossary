import React from 'react'
import CodeHighlighter from '@/components/CodeHighlighter'
import { render, cleanup, RenderResult } from '@testing-library/react'

let wrapper: RenderResult
beforeEach(() => {
  wrapper = render(<CodeHighlighter value={'test'} language={'javascript'} />)
})
afterEach(cleanup)

test('Match the snapshot', () => {
  expect(wrapper.asFragment()).toMatchSnapshot()
})
