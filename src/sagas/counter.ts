import { addSagaCount, GET_SAGA_COUNT } from '@/modules/counter'
import axios from 'axios'
import { call, put, take } from 'redux-saga/effects'

export function getApiSagaCount() {
  return axios
    .get('/api')
    .then(res => {
      return { sagaCount: res.data.sagaCount }
    })
    .catch(err => {
      return { error: err }
    })
}

export function* getSagaCount() {
  while (true) {
    yield take(GET_SAGA_COUNT)
    const {
      sagaCount,
      error
    }: { sagaCount: number; error: Error } = yield call(getApiSagaCount)

    if (sagaCount && error === undefined) {
      yield put(addSagaCount({ sagaCount }))
    } else {
      console.error('GET_SAGA_COUNT API response error')
    }
  }
}
