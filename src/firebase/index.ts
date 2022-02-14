import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'

import config from '@/firebase/config'

export default firebase.initializeApp(config)
