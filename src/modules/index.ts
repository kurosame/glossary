import { ICounterActions, ICounterState } from '@/modules/counter'
import { IWordActions, IWordState } from '@/modules/word'

export interface IActions {
  counter: ICounterActions
  word: IWordActions
}

export interface IStates {
  counter: ICounterState
  words: IWordState[]
}
