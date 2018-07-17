import admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp(functions.config().firebase)

export const setWord = functions.storage.object().onFinalize(o => {
  if (!o.name) {
    console.error('File not found')
    return null
  }

  const file = admin
    .storage()
    .bucket()
    .file(o.name)
  const fileNameSplitPeriod = file.name
    .split('/')
    .pop()!
    .split('.')
  fileNameSplitPeriod.pop()
  const fileName = fileNameSplitPeriod.join('.')

  file
    .download()
    .then(res => {
      const category: string = res[0]
        .toString()
        .match(/## category\n\n(.+)/)![1]
        .trim()
      const titles: string[] = res[0]
        .toString()
        .match(/## titles\n\n((.+\n)+)/)![1]
        .trim()
        .split(/\n/)
      const descriptions: string[] = res[0]
        .toString()
        .match(/## descriptions\n\n((.+\n|\n)+)/)![1]
        .trim()
        .split(/\n/)

      admin
        .firestore()
        .collection('words')
        .doc(fileName)
        .set({ category, titles, descriptions })
        .catch(err => {
          console.error(`Document set error fileName=${fileName} err=${err}`)
          return null
        })
    })
    .catch(err => {
      console.error(`File download error fileName=${fileName} err=${err}`)
      return null
    })

  return null
})
