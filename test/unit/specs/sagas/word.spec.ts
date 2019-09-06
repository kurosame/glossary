import firestore from '@/firebase/index'
import { GET_WORDS, SET_WORDS } from '@/modules/word'
import { getFirestoreWords, getWords } from '@/sagas/word'
import { call, put, take } from 'redux-saga/effects'

let spyFirestore: jest.SpyInstance
let spyErr: jest.SpyInstance

beforeEach(() => {
  spyFirestore = jest.spyOn(firestore, 'collection')
  spyErr = jest.spyOn(console, 'error')
})
afterEach(() => {
  spyFirestore.mockReset()
  spyErr.mockReset()
})

describe('Run getFirestoreWords', () => {
  test('Return words when resolved', async () => {
    spyFirestore.mockReturnValue({
      get: () =>
        Promise.resolve({
          docs: [
            {
              id: 'JavaScript',
              data: () => ({
                category: 'JavaScript',
                titles: ['JavaScript', 'JS'],
                description: 'It a JS'
              })
            },
            {
              id: 'TypeScript',
              data: () => ({
                category: 'JavaScript',
                titles: ['TypeScript', 'TS'],
                description: 'It a TS'
              })
            }
          ]
        })
    })

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
    expect(console.error).not.toBeCalled()
  })

  test('Output the console.error when rejected', async () => {
    spyFirestore.mockReturnValue({
      get: () => Promise.reject(new Error('error'))
    })

    expect(await getFirestoreWords()).toEqual([])
    expect(console.error).toBeCalled()
    expect(spyErr.mock.calls[0][0]).toEqual(
      'GET_WORDS Firestore response error'
    )
  })
})

describe('Run getWords', () => {
  test('Call put', () => {
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
