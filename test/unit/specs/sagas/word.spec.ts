import { firestore } from 'firebase'
import { call, put, take } from 'redux-saga/effects'
import firebase from '@/firebase/index'
import { GET_WORDS, SET_WORDS } from '@/modules/word'
import { getFirestoreWords, getWords } from '@/sagas/word'

let spyFirestore: (docs: Promise<firestore.QuerySnapshot>) => jest.SpyInstance
let spyErr: jest.SpyInstance
beforeEach(() => {
  spyFirestore = (docs): jest.SpyInstance =>
    (jest.spyOn(firebase.firestore(), 'collection') as jest.SpyInstance<
      Pick<firestore.CollectionReference, 'get'>
    >).mockReturnValue({ get: () => docs })
  spyErr = jest.spyOn(console, 'error')
  spyErr.mockImplementation(x => x)
})
afterEach(jest.restoreAllMocks)

describe('Run `getFirestoreWords`', () => {
  test('Return `words` when resolved', async () => {
    spyFirestore(
      Promise.resolve({
        docs: [
          {
            id: 'JavaScript',
            data: (): unknown => ({
              category: 'JavaScript',
              titles: ['JavaScript', 'JS'],
              description: 'It a JS'
            })
          },
          {
            id: 'TypeScript',
            data: (): unknown => ({
              category: 'JavaScript',
              titles: ['TypeScript', 'TS'],
              description: 'It a TS'
            })
          }
        ]
      } as firestore.QuerySnapshot)
    )

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
    spyFirestore(Promise.reject(new Error('error')))

    expect(await getFirestoreWords()).toEqual([])
    expect(spyErr).toBeCalled()
    expect(spyErr.mock.calls[0][0]).toEqual('GET_WORDS Firestore response error: error')
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
