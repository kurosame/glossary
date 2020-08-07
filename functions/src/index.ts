import admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp(functions.config().firebase)
admin.firestore().settings({ timestampsInSnapshots: true })

/* eslint-disable-next-line import/prefer-default-export */
export const setWord = functions
  .runWith({ timeoutSeconds: 540 })
  .storage.object()
  .onFinalize(async o => {
    if (!o.name) {
      console.error('File not found')
      return null
    }

    const file = admin
      .storage()
      .bucket()
      .file(o.name)

    if (!file.name) {
      console.error('File.name not found')
      return null
    }

    const fileName = file.name
      .split('/')
      .slice(-1)[0]
      .split('.')
      .slice(0, -1) // Have names that include periods (NODE.JS, VUE.JS, etc..)
      .join('.')

    await file
      .download()
      .then(async res => {
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
        if (!category || !titles[0] || !description)
          return Promise.reject(Error('Document format error'))

        const doSet = async (): Promise<void> => {
          await admin
            .firestore()
            .collection('words')
            .doc(fileName)
            .set({ category, titles, description, descriptionByLine })
            .catch(() => Promise.reject())
          console.info(`Run document set fileName=${fileName}`)
          await new Promise(r => setTimeout(r, 120000)) // Sleep for 2 minutes
          return admin
            .firestore()
            .collection('words')
            .doc(fileName)
            .get()
            .then(doc => {
              if (!doc.exists) return Promise.reject()
              const data = doc.data() || {
                category: '',
                titles: [],
                description: ''
              }
              return category === data.category &&
                JSON.stringify(titles) === JSON.stringify(data.titles) &&
                description === data.description
                ? Promise.resolve()
                : Promise.reject()
            })
            .catch(() => Promise.reject())
        }

        await doSet()
          .catch(doSet)
          .catch(doSet)
          .catch(() =>
            console.error(`Document not updates fileName=${fileName}`)
          )
        return null
      })
      .catch((err: Error) =>
        console.error(
          `File download error fileName=${fileName} err=${err.message}`
        )
      )
    return null
  })
