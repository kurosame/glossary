import { firestore } from '@/firebase/index'
import { GET_WORDS, IWordState, setWords } from '@/modules/word'
import { call, put, take } from 'redux-saga/effects'

export function getFirestoreWords() {
  return firestore
    .collection('words')
    .get()
    .then(res => {
      const words: IWordState[] = []
      res.forEach(d =>
        words.push({
          id: d.id,
          title: d.data().title,
          description: d.data().description
        })
      )
      return { words }
    })
    .catch(err => {
      return { err }
    })
}

export function* getWords() {
  while (true) {
    yield take(GET_WORDS)
    const { words, err }: { words: IWordState[]; err: Error } = yield call(
      getFirestoreWords
    )

    if (words && err === undefined) {
      yield put(setWords(words))
    } else {
      console.error('GET_WORDS Firestore response error')
    }
  }
}
