import firebase from 'firebase/app'
import { precacheAndRoute } from 'workbox-precaching'

const worker = self as unknown as ServiceWorkerGlobalScope
precacheAndRoute(worker.__WB_MANIFEST)

firebase.initializeApp({ messagingSenderId: '167100381499' })

worker.addEventListener('notificationclick', e => {
  e.notification.close()
  e.waitUntil(
    worker.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(wc => (wc.length === 0 ? worker.clients.openWindow(e.notification.data) : wc[0]?.focus()))
  )
})

firebase.messaging().onBackgroundMessage(p => {
  worker.registration.showNotification(`[Background] ${p.data?.title}`, {
    body: p.data?.message,
    data: location.origin
  })
})
