import { storage } from 'firebase-functions'
import fTest from 'firebase-functions-test'
/* eslint-disable import/no-unresolved */
// ESLint error only when VSCode
import { setWord } from '@/index'
/* eslint-enable import/no-unresolved */

let wrapper: (o: Pick<storage.ObjectMetadata, 'name'>) => void
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
afterEach(() => {
  wrapper = (): undefined => undefined
  jest.restoreAllMocks()
})

test('Output console.error when file not found', () => {
  const res = wrapper({ name: undefined })

  expect(res).toBeNull()
  expect(spyErr).toBeCalled()
  expect(spyErr.mock.calls[0][0]).toEqual('File not found')
})
