import { ADD_COUNT, ADD_SAGA_COUNT, counter } from '@/modules/counter'

describe('Run when ActionType is ADD_COUNT', () => {
  test('Set the state.count', () => {
    expect(counter({ count: 1, sagaCount: 2 }, { type: ADD_COUNT })).toEqual({
      count: 2,
      sagaCount: 2
    })
  })
})

describe('Run when ActionType is ADD_SAGA_COUNT', () => {
  test('Set the state.sagaCount when payload is nothing', () => {
    expect(
      counter(
        { count: 1, sagaCount: 2 },
        { type: ADD_SAGA_COUNT, payload: undefined }
      )
    ).toEqual({
      count: 1,
      sagaCount: 2
    })
  })

  test('Set the state.sagaCount when payload exists', () => {
    expect(
      counter(
        { count: 1, sagaCount: 2 },
        { type: ADD_SAGA_COUNT, payload: { count: 1, sagaCount: 2 } }
      )
    ).toEqual({
      count: 1,
      sagaCount: 4
    })
  })
})
