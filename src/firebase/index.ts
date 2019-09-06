import firebase from 'firebase/app'
import 'firebase/firestore'
import config from '@/firebase/config'

const firebaseApp = firebase.initializeApp(config)
const firestore = firebaseApp.firestore()

export default firestore
