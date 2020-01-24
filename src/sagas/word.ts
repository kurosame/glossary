import { Action } from 'redux-actions'
import {
  call,
  put,
  take,
  TakeEffect,
  CallEffect,
  PutEffect
} from 'redux-saga/effects'
import firebase from '@/firebase/index'
import { GET_WORDS, WordState, setWords } from '@/modules/word'

export function getFirestoreWords(): Promise<WordState[]> {
  return firebase
    .firestore()
    .collection('words')
    .get()
    .then(res =>
      res.docs.map(
        (d): WordState => ({
          id: d.id,
          category: d.data().category,
          titles: d.data().titles,
          description: d.data().description
        })
      )
    )
    .catch(() => {
      console.error('GET_WORDS Firestore response error')
      return []
    })
}

export function* getWords(): IterableIterator<
  TakeEffect | CallEffect | PutEffect<Action<{ words: WordState[] }>>
> {
  while (true) {
    yield take(GET_WORDS)
    yield put(setWords({ words: yield call(getFirestoreWords) }))
  }
}
