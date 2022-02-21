import firebase from '@/firebase/index'

interface Message {
  title: string
  body: string
}

export async function initialize(): Promise<void> {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker
      .register('/messaging-sw.js')
      .then(reg => (firebase.messaging() as any).useServiceWorker(reg))
      .catch((err: Error) => console.error(`SW register error: ${err.message}`))
  }

  firebase.messaging().onMessage((payload: { data: Message }) =>
    navigator.serviceWorker.ready
      .then(reg =>
        reg.showNotification(`[Foreground] ${payload.data.title}`, {
          body: payload.data.body,
          data: window.location.origin
        })
      )
      .catch((err: Error) => console.error(`SW activate error: ${err.message}`))
  )
  ;(firebase.messaging() as any).onTokenRefresh((): void => {
    console.info('FCM token refreshed')
    firebase
      .messaging()
      .getToken()
      .then(t => console.info(t))
      .catch((err: Error) => console.error(`FCM token refresh error: ${err.message}`))
  })
}

export function requestPermission(): void {
  Notification.requestPermission().then(p => {
    if (p === 'granted') {
      firebase
        .messaging()
        .getToken()
        .then(t => console.info(t))
        .catch((err: Error) => console.error(`FCM get token error: ${err.message}`))
    }
  })
}

export function isPermission(): string {
  return Notification.permission
}
