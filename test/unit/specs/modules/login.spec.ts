import { SET_IS_LOGIN, login } from '@/modules/login'

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
