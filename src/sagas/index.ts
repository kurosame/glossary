import { fork, ForkEffect } from 'redux-saga/effects'

import { getWords } from '@/sagas/word'

export default function* rootSaga(): IterableIterator<ForkEffect> {
  yield fork(getWords)
}
