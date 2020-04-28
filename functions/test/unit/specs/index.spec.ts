import { storage } from 'firebase-functions'
import fTest from 'firebase-functions-test'
/* eslint-disable import/no-unresolved */
// ESLint error only when VSCode
import { setWord } from '@/index'
/* eslint-enable import/no-unresolved */

const download = jest
  .fn()
  .mockRejectedValueOnce(Error('download error'))
  .mockResolvedValueOnce(['not match case'])
  .mockResolvedValue([
    '## category\n\njs\n\n## titles\n\nNode.js\nNode\n\n## description\n\nNode.js は言語としての機能だけでなく、...\nNode.js も Nginx と同様に...\n'
  ])
const file = jest
  .fn()
  .mockReturnValueOnce({ name: undefined })
  .mockReturnValue({ name: 'path/to/NODE.JS.md', download })
const set = jest
  .fn()
  .mockRejectedValueOnce(Error('set error'))
  .mockResolvedValue(Promise.resolve())

// jest.mock runs at top level
jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  firestore: (): {} => ({
    settings: jest.fn,
    collection: (): {} => ({ doc: (): {} => ({ set }) })
  }),
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

  test('Document set error', async () => {
    const res = await wrapper({ name: 'test' })

    expect(res).toBeNull()
    expect(spyErr).toBeCalled()
    expect(spyErr.mock.calls[0][0]).toEqual(
      'Document set error fileName=NODE.JS err=set error'
    )
  })
})

describe('Set document', () => {
  test('Not to match RegExp', async () => {
    const res = await wrapper({ name: 'test' })

    expect(res).toBeNull()
    expect(set).toBeCalled()
    expect(set.mock.calls[0][0]).toEqual({
      category: '',
      titles: [''],
      description: '',
      descriptionByLine: ['']
    })
    expect(spyErr).not.toBeCalled()
  })

  test('To match RegExp', async () => {
    const res = await wrapper({ name: 'test' })

    expect(res).toBeNull()
    expect(set).toBeCalled()
    expect(set.mock.calls[1][0]).toEqual({
      category: 'js',
      titles: ['Node.js', 'Node'],
      description:
        'Node.js は言語としての機能だけでなく、...\nNode.js も Nginx と同様に...',
      descriptionByLine: [
        'Node.js は言語としての機能だけでなく、...',
        'Node.js も Nginx と同様に...'
      ]
    })
    expect(spyErr).not.toBeCalled()
  })
})
