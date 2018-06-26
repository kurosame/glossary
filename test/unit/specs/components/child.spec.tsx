import Child from '@/components/Child'
import { mount } from 'enzyme'
import React from 'react'

const state = { count: 1, sagaCount: 2 }
const actions = {
  addCount: jest.fn(),
  addSagaCount: jest.fn(),
  getSagaCount: jest.fn()
}

const wrapper = mount(<Child state={state} actions={actions} />)

test('Data binding from the props.count to class name count', () => {
  expect(wrapper.html()).toContain('<span class="count">1</span>')
})

test('Click the button.add-count will call the addCount', () => {
  expect(actions.addCount.mock.calls[0]).toBeUndefined()

  wrapper.find('button.add-count').simulate('click')

  expect(actions.addCount).toBeCalled()
  expect(actions.addCount.mock.calls[0]).toEqual([])
})

test('Data binding from the props.sagaCount to class name sagaCount', () => {
  expect(wrapper.html()).toContain('<span class="saga-count">2</span>')
})

test('Click the button.add-saga-count will call the getSagaCount', () => {
  expect(actions.getSagaCount.mock.calls[0]).toBeUndefined()

  wrapper.find('button.add-saga-count').simulate('click')

  expect(actions.getSagaCount).toBeCalled()
  expect(actions.getSagaCount.mock.calls[0]).toEqual([])
})

test('Match the snapshot', () => {
  expect(wrapper.html()).toMatchSnapshot()
})
