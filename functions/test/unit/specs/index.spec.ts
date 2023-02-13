import type { pubsub, storage } from 'firebase-functions'
import fTest from 'firebase-functions-test'

/* eslint-disable-next-line import/no-unresolved,import/extensions */
import { disableApp, setWord } from '@/index'

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
  .mockReturnValueOnce({ name: 'not slash' })
  .mockReturnValue({ name: 'path/to/NODE.JS.md', download })
const set = jest.fn().mockRejectedValueOnce(Error('set error')).mockResolvedValue(Promise.resolve()) as jest.Mock<
  unknown,
  unknown[]
>
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

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  firestore: (): unknown => ({
    settings: jest.fn,
    collection: (): unknown => ({ doc: (): unknown => ({ set, get }) })
  }),
  storage: (): unknown => ({ bucket: (): unknown => ({ file }) })
}))

jest.mock('firebase-functions', () => ({
  ...jest.requireActual<Record<string, unknown>>('firebase-functions'),
  config: () => ({ pubsub: { topic: 'test_topic' } })
}))

jest.mock('googleapis', () => ({
  google: {
    auth: {
      GoogleAuth: jest.fn().mockImplementation(() => ({
        getClient: jest.fn,
        getProjectId: () => 'testApp'
      }))
    },
    appengine: () => ({ apps: { patch: jest.fn } })
  }
}))

describe('setWord', () => {
  let wrapper: (o: Pick<storage.ObjectMetadata, 'name'>) => Promise<unknown>
  let spyErr: jest.SpyInstance<unknown, unknown[]>
  beforeEach(() => {
    // offline mode
    const testData = fTest().storage.exampleObjectMetadata()
    wrapper = async o => {
      const wrap = (await fTest().wrap(setWord)({ ...testData, name: o.name })) as typeof wrapper
      return wrap
    }
    jest.spyOn(console, 'info').mockImplementation((x: unknown) => x)
    spyErr = jest.spyOn(console, 'error')
    spyErr.mockImplementation(x => x)
  })
  afterEach(() => {
    wrapper = () => Promise.resolve()
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
    fTest().cleanup()
    jest.restoreAllMocks()
  })

  describe('Output console.error', () => {
    test('Not found file', async () => {
      const res = await wrapper({ name: undefined })

      expect(res).toBeNull()
      expect(spyErr).toBeCalled()
      expect(spyErr.mock.calls[0]?.[0]).toEqual('File not found')
    })

    test('Not found file.name', async () => {
      const res = await wrapper({ name: 'test' })

      expect(res).toBeNull()
      expect(spyErr).toBeCalled()
      expect(spyErr.mock.calls[0]?.[0]).toEqual('File.name not found')
    })

    test('File download error', async () => {
      const res = await wrapper({ name: 'test' })

      expect(res).toBeNull()
      expect(spyErr).toBeCalled()
      expect(spyErr.mock.calls[0]?.[0]).toEqual('File download error fileName=NODE.JS err=download error')
    })

    test('Document format error with category not found', async () => {
      const res = await wrapper({ name: 'test' })

      expect(res).toBeNull()
      expect(spyErr).toBeCalled()
      expect(spyErr.mock.calls[0]?.[0]).toEqual('File download error fileName=NODE.JS err=Document format error')
    })

    test('Document format error with titles not found', async () => {
      const res = await wrapper({ name: 'test' })

      expect(res).toBeNull()
      expect(spyErr).toBeCalled()
      expect(spyErr.mock.calls[0]?.[0]).toEqual('File download error fileName=NODE.JS err=Document format error')
    })

    test('Document format error with description not found', async () => {
      const res = await wrapper({ name: 'test' })

      expect(res).toBeNull()
      expect(spyErr).toBeCalled()
      expect(spyErr.mock.calls[0]?.[0]).toEqual('File download error fileName=NODE.JS err=Document format error')
    })
  })

  describe('Set document', () => {
    // Disable setTimeout
    ;(global.setTimeout as unknown) = (fn: () => void): NodeJS.Timer => fn() as unknown as NodeJS.Timer

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
      expect(spyErr.mock.calls[0]?.[0]).toEqual('Document not updates fileName=NODE.JS')
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
      expect(spyErr.mock.calls[0]?.[0]).toEqual('Document not updates fileName=NODE.JS')
    })

    test('Set document to resolved', async () => {
      const res = await wrapper({ name: 'test' })

      expect(res).toBeNull()
      expect(set).toBeCalled()
      expect(set.mock.calls[1]?.[0]).toEqual({
        category: 'js',
        titles: ['Node.js', 'Node'],
        description: 'Node.js は言語としての機能だけでなく、...\nNode.js も Nginx と同様に...',
        descriptionByLine: ['Node.js は言語としての機能だけでなく、...', 'Node.js も Nginx と同様に...']
      })
      expect(spyErr).not.toBeCalled()
    })
  })
})

describe('disableApp', () => {
  let wrapper: (d: { costAmount?: number; budgetAmount?: number }) => Promise<unknown>
  let spyInfo: jest.SpyInstance<unknown, unknown[]>
  beforeEach(() => {
    // offline mode
    const testData = fTest().pubsub.exampleMessage()
    wrapper = async d => {
      const s = Buffer.from(JSON.stringify(d)).toString('base64')
      const wrap = (await fTest().wrap(disableApp)({ ...testData, data: s } as pubsub.Message)) as typeof wrapper
      return wrap
    }
    spyInfo = jest.spyOn(console, 'info')
    spyInfo.mockImplementation(x => x)
  })
  afterEach(() => {
    wrapper = () => Promise.resolve()
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
    fTest().cleanup()
    jest.restoreAllMocks()
  })

  test('Not run disableApp', async () => {
    const res = await wrapper({ costAmount: 1, budgetAmount: 1 })

    expect(res).toBeNull()
    expect(spyInfo).toBeCalled()
    expect(spyInfo.mock.calls[0]?.[0]).toEqual('No action necessary. (Current cost: 1)')
  })

  test('Disable to App', async () => {
    const res = await wrapper({})

    expect(res).toBeNull()
    expect(spyInfo).toBeCalled()
    expect(spyInfo.mock.calls[0]?.[0]).toEqual('App testApp disabled')
  })
})
