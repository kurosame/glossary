import { config } from '@/firebase/config'
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp(config)
export const firestore = firebaseApp.firestore()
