import { getSagaCount } from '@/sagas/counter'
import { getWords } from '@/sagas/word'
import { fork } from 'redux-saga/effects'

export default function* rootSaga() {
  yield fork(getSagaCount)
  yield fork(getWords)
}
