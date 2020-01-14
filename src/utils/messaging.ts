import { messaging } from '@/firebase/index'

export default async function initialize(): Promise<void> {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker
      .register('/messaging-sw.js')
      .then(reg => messaging.useServiceWorker(reg))
      .catch(err => console.error(err))
  }

  Notification.requestPermission().then(p => {
    if (p === 'granted') {
      messaging
        .getToken()
        .then(t => console.info(t))
        .catch(err => console.error(err))
    }
  })
}
