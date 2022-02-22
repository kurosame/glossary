import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getMessaging } from 'firebase/messaging'
import { getMessaging as getMessagingSW } from 'firebase/messaging/sw'

import config from '@/firebase/config'

const app = initializeApp(config)

export const auth = () => getAuth(app)
export const firestore = () => getFirestore(app)
export const messaging = () => getMessaging(app)
export const messagingSW = () => getMessagingSW(app)
