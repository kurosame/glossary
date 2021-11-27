importScripts('https://www.gstatic.com/firebasejs/6.2.4/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/6.2.4/firebase-messaging.js')
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js')

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)

firebase.initializeApp({ messagingSenderId: '167100381499' })
const messaging = firebase.messaging()

self.addEventListener('notificationclick', e => {
  e.notification.close()
  e.waitUntil(
    clients
      .matchAll({ includeUncontrolled: true })
      .then(wc => (wc.length === 0 ? clients.openWindow(e.notification.data) : wc[0].focus()))
  )
})

messaging.setBackgroundMessageHandler(payload =>
  self.registration.showNotification(`[Background] ${payload.data.title}`, {
    body: payload.data.message,
    data: location.origin
  })
)
