import { States } from '@/modules/states'
import Category from '@/containers/Category'
import { shallow } from 'enzyme'
import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'

describe('Match the snapshot', () => {
  test('The isLogin is true', () => {
    const wrapper = shallow(
      <Router initialEntries={['/']}>
        <Category
          location={{ pathname: '/react' }}
          store={configureStore<Pick<States, 'login'>>()({
            login: { isLogin: true }
          })}
        />
      </Router>
    )

    expect(wrapper.html()).not.toEqual('')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('The isLogin is false', () => {
    const wrapper = shallow(
      <Router initialEntries={['/']}>
        <Category
          location={{ pathname: '/react' }}
          store={configureStore<Pick<States, 'login'>>()({
            login: { isLogin: false }
          })}
        />
      </Router>
    )

    expect(wrapper.html()).toEqual('')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
