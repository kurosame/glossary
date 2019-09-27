import Login from '@/pages/Login'
import { States } from '@/modules/states'
import { mount } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'

describe('Match the snapshot', () => {
  test('The isLogin is true', () => {
    const wrapper = mount(
      <Login
        store={configureStore<Pick<States, 'login'>>()({
          login: { isLogin: true }
        })}
      />
    )

    expect(wrapper.html()).toEqual('')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('The isLogin is false', () => {
    const wrapper = mount(
      <Login
        store={configureStore<Pick<States, 'login'>>()({
          login: { isLogin: false }
        })}
      />
    )

    expect(wrapper.html()).not.toEqual('')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
