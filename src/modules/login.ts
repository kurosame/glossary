import { Reducer } from 'redux'
import {
  Action,
  ActionFunctionAny,
  createActions,
  handleActions
} from 'redux-actions'

// Action types
export const SET_IS_LOGIN = 'SET_IS_LOGIN'

export interface LoginActions {
  setIsLogin: ActionFunctionAny<Action<{ isLogin: boolean }>>
}

export interface LoginState {
  isLogin: boolean
}

const initialState: LoginState = { isLogin: false }

export const { setIsLogin } = createActions<{ isLogin: boolean }>(SET_IS_LOGIN)

export const login: Reducer<
  LoginState,
  Action<{ isLogin: boolean }>
> = handleActions(
  {
    [SET_IS_LOGIN]: (
      _state: LoginState,
      action: Action<{ isLogin: boolean }>
    ): LoginState => {
      return { isLogin: action.payload.isLogin }
    }
  },
  initialState
)
