import firebase from '@/firebase/index'

/* eslint-disable camelcase */
interface Notification {
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
      .catch(err => console.error(err))
  }

  Notification.requestPermission().then(p => {
    if (p === 'granted') {
      firebase
        .messaging()
        .getToken()
        .then(t => console.info(t))
        .catch(err => console.error(err))
    }
  })

  firebase.messaging().onMessage((payload: { notification: Notification }) =>
    navigator.serviceWorker.ready
      .then(reg =>
        reg.showNotification(`${payload.notification.title}(foreground)`, {
          body: payload.notification.body,
          data: payload.notification.click_action
        })
      )
      .catch(err => console.error(err))
  )
}
