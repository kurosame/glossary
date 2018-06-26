import { Reducer } from 'redux'
import {
  Action,
  ActionFunctionAny,
  createActions,
  handleActions
} from 'redux-actions'

// Action types
export const ADD_COUNT = 'ADD_COUNT'
export const ADD_SAGA_COUNT = 'ADD_SAGA_COUNT'
export const GET_SAGA_COUNT = 'GET_SAGA_COUNT'

export interface ICounterActions {
  addCount: ActionFunctionAny<Action<{}>>
  addSagaCount: ActionFunctionAny<Action<{ sagaCount: number }>>
  getSagaCount: ActionFunctionAny<Action<{}>>
}

export interface ICounterState {
  count: number
  sagaCount: number
}

const initialState: ICounterState = {
  count: 0,
  sagaCount: 0
}

export const { addCount, addSagaCount, getSagaCount } = createActions(
  ADD_COUNT,
  ADD_SAGA_COUNT,
  GET_SAGA_COUNT
)

export const counter: Reducer = handleActions(
  {
    [ADD_COUNT]: (state: ICounterState): ICounterState => {
      return { ...state, count: state.count + 1 }
    },
    [ADD_SAGA_COUNT]: (
      state: ICounterState,
      action: Action<ICounterState>
    ): ICounterState => {
      return {
        ...state,
        sagaCount:
          state.sagaCount + (action.payload ? action.payload.sagaCount : 0)
      }
    }
  },
  initialState
)
