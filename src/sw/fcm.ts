import { getToken, onMessage } from 'firebase/messaging'

import { messaging } from '@/firebase/index'

export const initializeSW = () => {
  onMessage(messaging(), p =>
    navigator.serviceWorker.ready
      .then(reg =>
        reg.showNotification(`[Foreground] ${p.data?.['title'] || ''}`, {
          body: p.data?.['message'] ?? '',
          data: window.location.origin
        })
      )
      .catch((err: Error) => console.error(`SW activate error: ${err.message}`))
  )
}

const isSupported = () => 'Notification' in window // Safari on iOS does not support Notification

export const requestPermission = async () => {
  await navigator.serviceWorker.register('/fcm-sw.js').then(async sw => {
    await Notification.requestPermission().then(p => {
      if (p === 'granted') {
        getToken(messaging(), { serviceWorkerRegistration: sw })
          .then(t => console.info(t))
          .catch((err: Error) => console.error(`FCM get token error: ${err.message}`))
      }
    })
  })
}

export const isPermission = () => (isSupported() ? Notification.permission : 'denied')
