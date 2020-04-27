import { storage } from 'firebase-functions'
import fTest from 'firebase-functions-test'
/* eslint-disable import/no-unresolved */
// ESLint error only when VSCode
import { setWord } from '@/index'
/* eslint-enable import/no-unresolved */

const download = jest.fn().mockRejectedValueOnce(Error('download error'))
const file = jest
  .fn()
  .mockReturnValueOnce({ name: undefined })
  .mockReturnValue({ name: 'path/to/NODE.JS.md', download })

// jest.mock runs at top level
jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  firestore: (): {} => ({ settings: jest.fn }),
  storage: (): {} => ({ bucket: (): {} => ({ file }) })
}))

let wrapper: (o: Pick<storage.ObjectMetadata, 'name'>) => void
let spyErr: jest.SpyInstance
beforeEach(() => {
  // offline mode
  wrapper = async (o): Promise<void> => fTest().wrap(setWord)({ name: o.name })
  spyErr = jest.spyOn(console, 'error')
  spyErr.mockImplementation(x => x)
})
afterEach(() => {
  wrapper = (): undefined => undefined
  fTest().cleanup()
  jest.restoreAllMocks()
})

describe('Output console.error', () => {
  test('Not found file', async () => {
    const res = await wrapper({ name: undefined })

    expect(res).toBeNull()
    expect(spyErr).toBeCalled()
    expect(spyErr.mock.calls[0][0]).toEqual('File not found')
  })

  test('Not found file.name', async () => {
    const res = await wrapper({ name: 'test' })

    expect(res).toBeNull()
    expect(spyErr).toBeCalled()
    expect(spyErr.mock.calls[0][0]).toEqual('File.name not found')
  })

  test('File download error', async () => {
    const res = await wrapper({ name: 'test' })

    expect(res).toBeNull()
    expect(spyErr).toBeCalled()
    expect(spyErr.mock.calls[0][0]).toEqual(
      'File download error fileName=NODE.JS err=download error'
    )
  })
})
