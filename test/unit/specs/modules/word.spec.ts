import { getWords, GET_WORDS, setWords, SET_WORDS, words, WordState } from '@/modules/word'

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

describe('Get the associated action type', () => {
  test('getWords', () => {
    expect(getWords && getWords('getWords')).toEqual({
      type: GET_WORDS,
      payload: 'getWords'
    })
  })
  test('setWords', () => {
    expect(setWords && setWords('setWords')).toEqual({
      type: SET_WORDS,
      payload: 'setWords'
    })
  })
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
