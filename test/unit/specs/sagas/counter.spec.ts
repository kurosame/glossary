import { ADD_SAGA_COUNT, GET_SAGA_COUNT } from '@/modules/counter'
import { getApiSagaCount, getSagaCount } from '@/sagas/counter'
import moxios from 'moxios'
import { call, put, take } from 'redux-saga/effects'

let spyErr: jest.SpyInstance

beforeEach(() => {
  moxios.install()
  spyErr = jest.spyOn(console, 'error')
})
afterEach(() => {
  moxios.uninstall()
  spyErr.mockReset()
})

describe('Run the getApiSagaCount', () => {
  test('Return the sagaCount', async () => {
    moxios.stubRequest('/api', {
      status: 200,
      response: { sagaCount: 2 }
    })

    expect(await getApiSagaCount()).toEqual({ sagaCount: 2 })
  })

  test('Return the error', async () => {
    moxios.stubRequest('/api', {
      status: 400
    })

    const res: { [key: string]: Error } = await getApiSagaCount()
    expect(res.error).toBeInstanceOf(Error)
  })
})

describe('Run the getSagaCount', () => {
  test('Call the put when resolved', () => {
    const saga = getSagaCount()

    let res = saga.next()
    expect(res.value).toEqual(take(GET_SAGA_COUNT))

    res = saga.next()
    expect(res.value).toEqual(call(getApiSagaCount))

    res = saga.next({ sagaCount: 1, error: undefined })
    const addSagaCountMock: jest.Mock = jest
      .fn()
      .mockReturnValue({ type: ADD_SAGA_COUNT, payload: { sagaCount: 1 } })
    expect(res.value).toEqual(put(addSagaCountMock()))

    res = saga.next()
    expect(res.value).toEqual(take(GET_SAGA_COUNT))

    expect(console.error).not.toBeCalled()
  })

  test('Not call the put when rejected', () => {
    const saga = getSagaCount()

    let res = saga.next()
    expect(res.value).toEqual(take(GET_SAGA_COUNT))

    res = saga.next()
    expect(res.value).toEqual(call(getApiSagaCount))

    res = saga.next({ sagaCount: undefined, error: 'error' })
    expect(res.value).toEqual(take(GET_SAGA_COUNT))

    expect(console.error).toBeCalled()
    expect(spyErr.mock.calls[0][0]).toEqual('GET_SAGA_COUNT API response error')
  })
})
