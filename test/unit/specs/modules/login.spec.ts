import { login, setIsLogin, SET_IS_LOGIN } from '@/modules/login'

describe('Get the associated action type', () => {
  test('setIsLogin', () => {
    expect(setIsLogin && setIsLogin('setIsLogin')).toEqual({
      type: SET_IS_LOGIN,
      payload: 'setIsLogin'
    })
  })
})

test('Run when ActionType is SET_IS_LOGIN', () => {
  expect(
    login(
      { isLogin: false },
      {
        type: SET_IS_LOGIN,
        payload: { isLogin: true }
      }
    )
  ).toEqual({ isLogin: true })
})
