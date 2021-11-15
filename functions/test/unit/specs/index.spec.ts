import { storage } from 'firebase-functions'
/* eslint-disable-next-line import/no-extraneous-dependencies */
import fTest from 'firebase-functions-test'
// ESLint error only when VSCode
/* eslint-disable-next-line import/no-unresolved */
import { setWord } from '@/index'

const download = jest
  .fn()
  .mockRejectedValueOnce(Error('download error'))
  .mockResolvedValueOnce(['not match case'])
  .mockResolvedValueOnce(['## category\n\njs\n\nnot match case'])
  .mockResolvedValueOnce(['## category\n\njs\n\n## titles\n\nNode.js\nNode\n\nnot match case'])
  .mockResolvedValue([
    '## category\n\njs\n\n## titles\n\nNode.js\nNode\n\n## description\n\nNode.js は言語としての機能だけでなく、...\nNode.js も Nginx と同様に...\n'
  ])
const file = jest
  .fn()
  .mockReturnValueOnce({ name: undefined })
  .mockReturnValue({ name: 'path/to/NODE.JS.md', download })
const set = jest.fn().mockRejectedValueOnce(Error('set error')).mockResolvedValue(Promise.resolve())
const get = jest
  .fn()
  .mockResolvedValueOnce({ exists: false })
  .mockResolvedValueOnce({ exists: true, data: () => undefined })
  .mockResolvedValueOnce({
    exists: true,
    data: (): unknown => ({ category: 'not match' })
  })
  .mockResolvedValueOnce({
    exists: true,
    data: (): unknown => ({ category: 'js', titles: ['not match'] })
  })
  .mockResolvedValueOnce({
    exists: true,
    data: (): unknown => ({
      category: 'js',
      titles: ['Node.js', 'Node'],
      description: 'not match'
    })
  })
  .mockResolvedValue({
    exists: true,
    data: (): unknown => ({
      category: 'js',
      titles: ['Node.js', 'Node'],
      description: 'Node.js は言語としての機能だけでなく、...\nNode.js も Nginx と同様に...'
    })
  })

// jest.mock runs at top level
jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  firestore: (): unknown => ({
    settings: jest.fn,
    collection: (): unknown => ({ doc: (): unknown => ({ set, get }) })
  }),
  storage: (): unknown => ({ bucket: (): unknown => ({ file }) })
}))

let wrapper: (o: Pick<storage.ObjectMetadata, 'name'>) => Promise<void>
let spyErr: jest.SpyInstance
beforeEach(() => {
  // offline mode
  wrapper = async (o): Promise<void> => fTest().wrap(setWord)({ name: o.name })
  jest.spyOn(console, 'info').mockImplementation(x => x)
  spyErr = jest.spyOn(console, 'error')
  spyErr.mockImplementation(x => x)
})
afterEach(() => {
  wrapper = (): Promise<void> => Promise.resolve()
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
    expect(spyErr.mock.calls[0][0]).toEqual('File download error fileName=NODE.JS err=download error')
  })

  test('Document format error with category not found', async () => {
    const res = await wrapper({ name: 'test' })

    expect(res).toBeNull()
    expect(spyErr).toBeCalled()
    expect(spyErr.mock.calls[0][0]).toEqual('File download error fileName=NODE.JS err=Document format error')
  })

  test('Document format error with titles not found', async () => {
    const res = await wrapper({ name: 'test' })

    expect(res).toBeNull()
    expect(spyErr).toBeCalled()
    expect(spyErr.mock.calls[0][0]).toEqual('File download error fileName=NODE.JS err=Document format error')
  })

  test('Document format error with description not found', async () => {
    const res = await wrapper({ name: 'test' })

    expect(res).toBeNull()
    expect(spyErr).toBeCalled()
    expect(spyErr.mock.calls[0][0]).toEqual('File download error fileName=NODE.JS err=Document format error')
  })
})

describe('Set document', () => {
  // Disable setTimeout
  global.setTimeout = (fn: () => void): NodeJS.Timer => (fn() as unknown) as NodeJS.Timer

  test('Not updates document (1)', async () => {
    /* 
      # This test case includes:
      - set() to error
      - doc.exists is false
      - doc.data is undefined
    */
    const res = await wrapper({ name: 'test' })

    expect(res).toBeNull()
    expect(spyErr).toBeCalled()
    expect(spyErr.mock.calls[0][0]).toEqual('Document not updates fileName=NODE.JS')
  })

  test('Not updates document (2)', async () => {
    /*
      # This test case includes:
      - category and data.category are not equal
      - titles and data.titles are not equal
      - description and data.description are not equal
    */
    const res = await wrapper({ name: 'test' })

    expect(res).toBeNull()
    expect(spyErr).toBeCalled()
    expect(spyErr.mock.calls[0][0]).toEqual('Document not updates fileName=NODE.JS')
  })

  test('Set document to resolved', async () => {
    const res = await wrapper({ name: 'test' })

    expect(res).toBeNull()
    expect(set).toBeCalled()
    expect(set.mock.calls[1][0]).toEqual({
      category: 'js',
      titles: ['Node.js', 'Node'],
      description: 'Node.js は言語としての機能だけでなく、...\nNode.js も Nginx と同様に...',
      descriptionByLine: ['Node.js は言語としての機能だけでなく、...', 'Node.js も Nginx と同様に...']
    })
    expect(spyErr).not.toBeCalled()
  })
})
