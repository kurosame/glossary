import admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp(functions.config().firebase)
admin.firestore().settings({ timestampsInSnapshots: true })

/* eslint-disable import/prefer-default-export */
export const setWord = functions.storage.object().onFinalize(o => {
  if (!o.name) {
    console.error('File not found')
    return null
  }

  const file = admin.storage().bucket().file(o.name)

  if (!file.name) {
    console.error('File.name not found')
    return null
  }

  const fileNameSplitPeriod = file.name.split('/').slice(-1)[0].split('.')
  const fileName = fileNameSplitPeriod.slice(0, -1).join('.')

  file
    .download()
    .then(res => {
      const category: string = (res[0]
        .toString()
        .match(/## category\n\n(.+)/) || ['', ''])[1].trim()
      const titles: string[] = (res[0]
        .toString()
        .match(/## titles\n\n((.+\n)+)/) || ['', ''])[1]
        .trim()
        .split(/\n/)
      const description: string = (res[0]
        .toString()
        .match(/## description\n\n((.+\n|\n)+)/) || ['', ''])[1].trim()
      const descriptionByLine: string[] = (res[0]
        .toString()
        .match(/## description\n\n((.+\n|\n)+)/) || ['', ''])[1]
        .trim()
        .split(/\n/)

      admin
        .firestore()
        .collection('words')
        .doc(fileName)
        .set({ category, titles, description, descriptionByLine })
        .catch((err: Error) => {
          console.error(
            `Document set error fileName=${fileName} err=${err.message}`
          )
          return null
        })
    })
    .catch((err: Error) => {
      console.error(
        `File download error fileName=${fileName} err=${err.message}`
      )
      return null
    })

  return null
})
/* eslint-enable import/prefer-default-export */
