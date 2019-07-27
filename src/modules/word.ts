import { Reducer } from 'redux'
import {
  Action,
  ActionFunctionAny,
  createActions,
  handleActions
} from 'redux-actions'

// Action types
export const GET_WORDS = 'GET_WORDS'
export const SET_WORDS = 'SET_WORDS'

export interface IWordActions {
  getWords: ActionFunctionAny<Action<{}>>
  setWords: ActionFunctionAny<Action<{ words: IWordState[] }>>
}

export interface IWordState {
  id: string
  category: string
  titles: string[]
  description: string
}

const initialState: IWordState[] = []

export const { getWords, setWords } = createActions(GET_WORDS, SET_WORDS)

export const words: Reducer<IWordState[], Action<IWordState[]>> = handleActions(
  {
    [SET_WORDS]: (
      state: IWordState[],
      action: Action<IWordState[]>
    ): IWordState[] => {
      return !!action.payload.length ? action.payload : state
    }
  },
  initialState
)
