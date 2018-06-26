import { env } from '@/firebase/env'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp(env)
export const firestore = firebaseApp.firestore()
