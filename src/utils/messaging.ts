import firebase from '@/firebase/index'

/* eslint-disable camelcase */
interface NotificationTypes {
  title: string
  body: string
  click_action: string
}
/* eslint-enable camelcase */

export default async function initialize(): Promise<void> {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker
      .register('/messaging-sw.js')
      .then(reg => firebase.messaging().useServiceWorker(reg))
      .catch((err: Error) => console.error(`SW register error: ${err.message}`))
  }

  Notification.requestPermission().then(p => {
    if (p === 'granted') {
      firebase
        .messaging()
        .getToken()
        .then(t => console.info(t))
        .catch((err: Error) =>
          console.error(`FCM getToken error: ${err.message}`)
        )
    }
  })

  firebase
    .messaging()
    .onMessage((payload: { notification: NotificationTypes }) =>
      navigator.serviceWorker.ready
        .then(reg =>
          reg.showNotification(`${payload.notification.title}(foreground)`, {
            body: payload.notification.body,
            data: payload.notification.click_action
          })
        )
        .catch((err: Error) =>
          console.error(`SW activate error: ${err.message}`)
        )
    )
}
