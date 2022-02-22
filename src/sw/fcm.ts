import { getToken, onMessage } from 'firebase/messaging'

import { messaging } from '@/firebase/index'

export const initialize = () => {
  onMessage(messaging(), p =>
    navigator.serviceWorker.ready
      .then(reg =>
        reg.showNotification(`[Foreground] ${p.data?.title}`, {
          body: p.data?.body,
          data: window.location.origin
        })
      )
      .catch((err: Error) => console.error(`SW activate error: ${err.message}`))
  )
}

export const requestPermission = () => {
  navigator.serviceWorker.register('/fcm-sw.js').then(sw => {
    Notification.requestPermission().then(p => {
      if (p === 'granted') {
        getToken(messaging(), { serviceWorkerRegistration: sw })
          .then(t => console.info(t))
          .catch((err: Error) => console.error(`FCM get token error: ${err.message}`))
      }
    })
  })
}

export const isPermission = () => Notification.permission
