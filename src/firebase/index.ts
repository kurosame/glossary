import { env } from '@/firebase/env'
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp(env)
export const firestore = firebaseApp.firestore()
firestore.settings({ timestampsInSnapshots: true })
