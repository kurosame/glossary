import { SET_WORDS, words, WordState } from '@/modules/word'

let wrapper: (w: WordState[]) => WordState[] | undefined
beforeEach(() => {
  wrapper = (w): WordState[] =>
    words(
      [
        {
          id: 'JavaScript',
          category: 'JavaScript',
          titles: ['JavaScript', 'JS'],
          description: 'It a JS'
        }
      ],
      { type: SET_WORDS, payload: { words: w } }
    )
})
afterEach(() => {
  wrapper = (): undefined => undefined
})

describe('Run when ActionType is SET_WORDS', () => {
  test('Set state when `words` exists', () => {
    expect(
      wrapper([
        {
          id: 'TypeScript',
          category: 'JavaScript',
          titles: ['TypeScript', 'TS'],
          description: 'It a TS'
        }
      ])
    ).toEqual([
      {
        id: 'TypeScript',
        category: 'JavaScript',
        titles: ['TypeScript', 'TS'],
        description: 'It a TS'
      }
    ])
  })

  test('Set state when `words` is nothing', () => {
    expect(wrapper([])).toEqual([])
  })
})
