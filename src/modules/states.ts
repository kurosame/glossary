import { LoginState } from '@/modules/login'
import { WordState } from '@/modules/word'

export interface States {
  login: LoginState
  words: WordState[]
}
