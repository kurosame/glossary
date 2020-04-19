// import { storage } from 'firebase-functions'
import fTest from 'firebase-functions-test'
import { setWord } from '@/index'

let wrapper: (o: any) => any
let spyErr: jest.SpyInstance
beforeEach(() => {
  jest.mock('firebase-admin', () => ({
    initializeApp: jest.fn(),
    firestore: (): {} => ({
      settings: jest.fn
    }),
    storage: (): {} => ({ bucket: (): {} => ({ file: '' }) })
  }))

  // offline mode
  wrapper = (o): void =>
    fTest().wrap(setWord)({
      name: o.name
    })
  spyErr = jest.spyOn(console, 'error')
  spyErr.mockImplementation(x => x)
})
afterEach(jest.restoreAllMocks)

test('Output the console.error when file not found', () => {
  const res = wrapper({ name: undefined })

  expect(res).toBeNull()
  expect(spyErr).toBeCalled()
  expect(spyErr.mock.calls[0][0]).toEqual('File not found')
})
