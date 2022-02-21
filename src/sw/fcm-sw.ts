// import { initializeApp } from 'firebase/app'
import { onBackgroundMessage } from 'firebase/messaging/sw'
import { precacheAndRoute } from 'workbox-precaching'

import { messaging } from '@/firebase/index'

const worker = self as unknown as ServiceWorkerGlobalScope
precacheAndRoute(worker.__WB_MANIFEST)

// initializeApp({ messagingSenderId: '167100381499' })

worker.addEventListener('notificationclick', e => {
  e.notification.close()
  e.waitUntil(
    worker.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(wc => (wc.length === 0 ? worker.clients.openWindow(e.notification.data) : wc[0]?.focus()))
  )
})

onBackgroundMessage(messaging(), p => {
  worker.registration.showNotification(`[Background] ${p.data?.title}`, {
    body: p.data?.message,
    data: location.origin
  })
})
