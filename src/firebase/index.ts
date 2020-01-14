import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'
import config from '@/firebase/config'
import initializeMessaging from '@/utils/messaging'

const firebaseApp = firebase.initializeApp(config)
export const auth = firebaseApp.auth()
export const firestore = firebaseApp.firestore()
export const messaging = firebaseApp.messaging()

initializeMessaging()
