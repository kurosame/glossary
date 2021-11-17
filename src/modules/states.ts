import type { LoginState } from '@/modules/login'
import type { WordState } from '@/modules/word'

export interface States {
  login: LoginState
  words: WordState[]
}
