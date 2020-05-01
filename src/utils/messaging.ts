import firebase from '@/firebase/index'

/* eslint-disable camelcase */
interface NotificationTypes {
  title: string
  body: string
  click_action: string
}
/* eslint-enable camelcase */

export async function initialize(): Promise<void> {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker
      .register('/messaging-sw.js')
      .then(reg => firebase.messaging().useServiceWorker(reg))
      .catch((err: Error) => console.error(`SW register error: ${err.message}`))
  }

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

  firebase.messaging().onTokenRefresh((): void => {
    console.info('FCM token refreshed')
    firebase
      .messaging()
      .getToken()
      .then(t => console.info(t))
      .catch((err: Error) =>
        console.error(`FCM token refresh error: ${err.message}`)
      )
  })
}

export function requestPermission(): void {
  Notification.requestPermission().then(p => {
    if (p === 'granted') {
      firebase
        .messaging()
        .getToken()
        .then(t => console.info(t))
        .catch((err: Error) =>
          console.error(`FCM get token error: ${err.message}`)
        )
    }
  })
}

export function isPermission(): string {
  return Notification.permission
}
