import { SET_WORDS, words } from '@/modules/word'

describe('Run when ActionType is SET_WORDS', () => {
  test('Set the state when payload exists', () => {
    expect(
      words(
        [
          {
            id: 'JavaScript',
            titles: ['JavaScript', 'JS'],
            descriptions: ['It a ', 'JS']
          }
        ],
        {
          type: SET_WORDS,
          payload: [
            {
              id: 'TypeScript',
              titles: ['TypeScript', 'TS'],
              descriptions: ['It a ', 'TS']
            }
          ]
        }
      )
    ).toEqual([
      {
        id: 'TypeScript',
        titles: ['TypeScript', 'TS'],
        descriptions: ['It a ', 'TS']
      }
    ])
  })

  test('Set the state when payload is nothing', () => {
    expect(
      words(
        [
          {
            id: 'JavaScript',
            titles: ['JavaScript', 'JS'],
            descriptions: ['It a ', 'JS']
          }
        ],
        {
          type: SET_WORDS,
          payload: undefined
        }
      )
    ).toEqual([
      {
        id: 'JavaScript',
        titles: ['JavaScript', 'JS'],
        descriptions: ['It a ', 'JS']
      }
    ])
  })
})
