/**
 * @jest-environment jsdom
 */
import React from 'react'

import { cleanup, render, RenderResult } from '@testing-library/react'

import CodeBlock from '@/components/CodeBlock'

let wrapper: (inline?: boolean, className?: string) => RenderResult
beforeEach(() => {
  wrapper = (inline, className): RenderResult =>
    render(
      <CodeBlock inline={!!inline} className={className ?? ''}>
        {['']}
      </CodeBlock>
    )
})
afterEach(cleanup)

describe('Render to `CodeHighlighter`', () => {
  test('Returns `CodeHighlighter` when matches a regular expression', () => {
    expect(wrapper(undefined, 'language-js').queryByTestId('code-highlighter')).not.toBeNull()
  })

  test('Match the snapshot', () => {
    expect(wrapper(undefined, 'language-js').asFragment()).toMatchSnapshot()
  })
})

describe('Render to `<code></code>`', () => {
  test('Returns `<code></code>` when not matches a regular expression', () => {
    expect(wrapper().queryByTestId('code-highlighter')).toBeNull()
  })

  test('Match the snapshot', () => {
    expect(wrapper().asFragment()).toMatchSnapshot()
  })
})
