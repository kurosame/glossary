import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from '@/firebase/config'

const firebaseApp = firebase.initializeApp(config)
export const auth = firebaseApp.auth()
export const firestore = firebaseApp.firestore()
