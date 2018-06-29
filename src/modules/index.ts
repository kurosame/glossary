import { IWordActions, IWordState } from '@/modules/word'

export interface IActions {
  word: IWordActions
}

export interface IStates {
  words: IWordState[]
}
