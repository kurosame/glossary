import { collection, getDocs, Query } from 'firebase/firestore'
import type { Action } from 'redux-actions'
import type { CallEffect, PutEffect, TakeEffect } from 'redux-saga/effects'
import { call, put, take } from 'redux-saga/effects'

import { firestore } from '@/firebase/index'
import type { WordState } from '@/modules/word'
import { GET_WORDS, setWords } from '@/modules/word'

export const getFirestoreWords = (): Promise<WordState[]> =>
  getDocs<WordState>(collection(firestore(), 'words') as Query<WordState>)
    .then(res =>
      res.docs.map(d => ({
        id: d.id,
        category: d.data().category,
        titles: d.data().titles,
        description: d.data().description
      }))
    )
    .catch((err: Error) => {
      console.error(`GET_WORDS Firestore response error: ${err.message}`)
      return []
    })

export function* getWords(): IterableIterator<TakeEffect | CallEffect | PutEffect<Action<{ words: WordState[] }>>> {
  while (true) {
    yield take(GET_WORDS)
    if (setWords) {
      yield put(setWords({ words: yield call(getFirestoreWords) }))
    }
  }
}
