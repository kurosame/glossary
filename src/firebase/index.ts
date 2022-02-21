import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getMessaging } from 'firebase/messaging'

import config from '@/firebase/config'

const firebase = initializeApp(config)

export const auth = () => getAuth(firebase)
export const firestore = () => getFirestore(firebase)
export const messaging = () => getMessaging(firebase)
