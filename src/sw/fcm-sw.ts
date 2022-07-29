import { onBackgroundMessage } from 'firebase/messaging/sw'
import { precacheAndRoute } from 'workbox-precaching'

import { messagingSW } from '@/firebase/index'

declare const self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('notificationclick', e => {
  e.notification.close()
  e.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(wc => (wc.length === 0 ? self.clients.openWindow(e.notification.data as string) : wc[0]?.focus()))
  )
})

onBackgroundMessage(messagingSW(), async p => {
  await self.registration.showNotification(`[Background] ${p.data?.title || ''}`, {
    body: p.data?.message,
    data: location.origin
  })
})
