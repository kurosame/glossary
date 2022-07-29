import { call, put, take } from 'redux-saga/effects'

import { GET_WORDS, SET_WORDS } from '@/modules/word'
import { getFirestoreWords, getWords } from '@/sagas/word'

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn().mockReturnValue({ withConverter: jest.fn() }),
  getDocs: jest
    .fn()
    .mockResolvedValueOnce({
      docs: [
        {
          id: 'JavaScript',
          data: () => ({ category: 'JavaScript', titles: ['JavaScript', 'JS'], description: 'It a JS' })
        },
        {
          id: 'TypeScript',
          data: () => ({ category: 'JavaScript', titles: ['TypeScript', 'TS'], description: 'It a TS' })
        }
      ]
    })
    .mockRejectedValue(new Error('error'))
}))

let spyErr: jest.SpyInstance<unknown, unknown[]>
beforeEach(() => {
  spyErr = jest.spyOn(console, 'error').mockImplementation((x: unknown) => x)
})
afterEach(jest.restoreAllMocks)

describe('Run `getFirestoreWords`', () => {
  test('Return `words` when resolved', async () => {
    expect(await getFirestoreWords()).toEqual([
      {
        id: 'JavaScript',
        category: 'JavaScript',
        titles: ['JavaScript', 'JS'],
        description: 'It a JS'
      },
      {
        id: 'TypeScript',
        category: 'JavaScript',
        titles: ['TypeScript', 'TS'],
        description: 'It a TS'
      }
    ])
    expect(spyErr).not.toBeCalled()
  })

  test('Output console.error when rejected', async () => {
    expect(await getFirestoreWords()).toEqual([])
    expect(spyErr).toBeCalled()
    expect(spyErr.mock.calls[0]?.[0]).toEqual('GET_WORDS Firestore response error: error')
  })
})

describe('Run `getWords`', () => {
  test('Call `put`', () => {
    const saga = getWords()

    let res = saga.next()
    expect(res.value).toEqual(take(GET_WORDS))

    res = saga.next()
    expect(res.value).toEqual(call(getFirestoreWords))

    res = saga.next()
    const setWordsMock: jest.Mock = jest.fn().mockReturnValue({
      type: SET_WORDS,
      payload: { words: undefined }
    })
    expect(res.value).toEqual(put(setWordsMock()))

    res = saga.next()
    expect(res.value).toEqual(take(GET_WORDS))
  })
})
