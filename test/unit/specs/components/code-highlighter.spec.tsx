import CodeHighlighter from '@/components/CodeHighlighter'
import { mount } from 'enzyme'
import React from 'react'

const wrapper = mount(
  <CodeHighlighter value={'test'} language={'javascript'} />
)

test('Match the snapshot', () => {
  expect(wrapper.html()).toMatchSnapshot()
})
