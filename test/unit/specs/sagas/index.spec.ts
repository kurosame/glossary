import { fork } from 'redux-saga/effects'
import rootSaga from '@/sagas/index'
import { getWords } from '@/sagas/word'

test('Run `rootSaga`', () => {
  expect(rootSaga().next().value).toEqual(fork(getWords))
})
