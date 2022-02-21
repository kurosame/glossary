import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/messaging'

import config from '@/firebase/config'

export default firebase.initializeApp(config)
