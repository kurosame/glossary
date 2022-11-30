import admin, { AppOptions } from 'firebase-admin'
import * as functions from 'firebase-functions'
import { google } from 'googleapis'

admin.initializeApp(functions.config().firebase as AppOptions)
admin.firestore().settings({ timestampsInSnapshots: true })

export const setWord = functions
  .runWith({ timeoutSeconds: 540 })
  .storage.object()
  .onFinalize(async o => {
    if (!o.name) {
      console.error('File not found')
      return null
    }

    const file = admin.storage().bucket().file(o.name)
    const fileName = file.name
      .split('/')
      .slice(-1)[0]
      ?.split('.')
      .slice(0, -1) // Consider patterns that include periods (NODE.JS, VUE.JS, etc..)
      .join('.')

    if (!fileName) {
      console.error('File.name not found')
      return null
    }

    await file
      .download()
      .then(async res => {
        const category = (res[0].toString().match(/## category\n\n(.+)/) || ['', ''])[1]?.trim()
        const titles = (res[0].toString().match(/## titles\n\n((.+\n)+)/) || ['', ''])[1]?.trim().split(/\n/)
        const description = (res[0].toString().match(/## description\n\n((.+\n|\n)+)/) || ['', ''])[1]?.trim()
        const descriptionByLine = (res[0].toString().match(/## description\n\n((.+\n|\n)+)/) || ['', ''])[1]
          ?.trim()
          .split(/\n/)
        if (!category || !titles || !description) return Promise.reject(Error('Document format error'))

        const doSet = async (): Promise<void> => {
          await admin
            .firestore()
            .collection('words')
            .doc(fileName)
            .set({ category, titles, description, descriptionByLine })
            .catch(() => Promise.reject())
          console.info(`Run document set fileName=${fileName}`)
          await new Promise(r => setTimeout(r, 120000)) /* eslint-disable-line no-promise-executor-return */
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
          .catch(() => console.error(`Document not updates fileName=${fileName}`))
        return null
      })
      .catch((err: Error) => console.error(`File download error fileName=${fileName} err=${err.message}`))

    return null
  })

export const disableApp = functions.pubsub
  .topic((functions.config() as { pubsub: { topic: string } }).pubsub.topic)
  .onPublish(async m => {
    const data = JSON.parse(Buffer.from(m.data, 'base64').toString()) as { costAmount: number; budgetAmount: number }
    if (data.costAmount <= data.budgetAmount) {
      console.info(`No action necessary. (Current cost: ${data.costAmount})`)
      return null
    }

    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    })
    const authClient = await auth.getClient()
    const projectId = await auth.getProjectId()

    await google.appengine('v1').apps.patch({
      auth: authClient,
      appsId: projectId,
      updateMask: 'serving_status',
      requestBody: { servingStatus: 'USER_DISABLED' }
    })
    console.info(`App ${projectId} disabled`)

    return null
  })
