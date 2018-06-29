import rootSaga from '@/sagas/index'
import { getWords } from '@/sagas/word'
import { fork } from 'redux-saga/effects'

test('Run the rootSaga', () => {
  expect(rootSaga().next().value).toEqual(fork(getWords))
})
