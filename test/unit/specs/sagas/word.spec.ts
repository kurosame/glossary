import { firestore } from '@/firebase/index'
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

describe('Run the getFirestoreWords', () => {
  test('Return the words', async () => {
    spyFirestore.mockReturnValue({
      get: () =>
        Promise.resolve([
          {
            id: 'JavaScript',
            data: () => {
              return {
                category: 'JavaScript',
                titles: ['JavaScript', 'JS'],
                description: 'It a JS'
              }
            }
          },
          {
            id: 'TypeScript',
            data: () => {
              return {
                category: 'JavaScript',
                titles: ['TypeScript', 'TS'],
                description: 'It a TS'
              }
            }
          }
        ])
    })

    expect(await getFirestoreWords()).toEqual({
      words: [
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
      ]
    })
  })

  test('Return the err', async () => {
    spyFirestore.mockReturnValue({
      get: () => Promise.reject(new Error('error'))
    })

    const res: { [key: string]: any } = await getFirestoreWords()
    expect(res.err).toBeInstanceOf(Error)
  })
})

describe('Run the getWords', () => {
  test('Call the put when resolved', () => {
    const saga = getWords()

    let res = saga.next()
    expect(res.value).toEqual(take(GET_WORDS))

    res = saga.next()
    expect(res.value).toEqual(call(getFirestoreWords))

    res = saga.next({
      words: [
        {
          id: 'React',
          category: 'React',
          titles: ['React'],
          description: 'It a React'
        }
      ],
      error: undefined
    })
    const setWordsMock: jest.Mock = jest.fn().mockReturnValue({
      type: SET_WORDS,
      payload: [
        {
          id: 'React',
          category: 'React',
          titles: ['React'],
          description: 'It a React'
        }
      ],
      error: undefined
    })
    expect(res.value).toEqual(put(setWordsMock()))

    res = saga.next()
    expect(res.value).toEqual(take(GET_WORDS))

    expect(console.error).not.toBeCalled()
  })

  test('Output the console.error when rejected', () => {
    const saga = getWords()

    let res = saga.next()
    expect(res.value).toEqual(take(GET_WORDS))

    res = saga.next()
    expect(res.value).toEqual(call(getFirestoreWords))

    res = saga.next({ words: undefined, error: 'error' })
    expect(res.value).toEqual(take(GET_WORDS))

    expect(console.error).toBeCalled()
    expect(spyErr.mock.calls[0][0]).toEqual(
      'GET_WORDS Firestore response error'
    )
  })
})
