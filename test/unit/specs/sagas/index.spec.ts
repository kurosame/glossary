import { getSagaCount } from '@/sagas/counter'
import rootSaga from '@/sagas/index'
import { fork } from 'redux-saga/effects'

test('Run the rootSaga', () => {
  expect(rootSaga().next().value).toEqual(fork(getSagaCount))
})
