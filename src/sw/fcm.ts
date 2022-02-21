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
  navigator.serviceWorker.register('/fcm-sw.js').then(r =>
    Notification.requestPermission().then(p => {
      if (p === 'granted') {
        getToken(messaging(), {
          vapidKey: 'BO0BhCvhJu4c_NykrGf8hEBvE4NmyzFCvQNiTn_Z5CvYl1eoiTlz8A_8Wcx5LpsAa0PYWz6KwQ1JKhLOZFnToOw',
          serviceWorkerRegistration: r
        })
          .then(t => console.info(t))
          .catch((err: Error) => console.error(`FCM get token error: ${err.message}`))
      }
    })
  )
}

export const isPermission = () => Notification.permission
