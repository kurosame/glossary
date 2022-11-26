const config = {
  apiKey: process.env['LOCAL_FIREBASE_API_KEY']
    ? process.env['LOCAL_FIREBASE_API_KEY']
    : 'AIzaSyDF_tzZ2nR_kQ-yyadD8KEkPOY4VXWi4yg',
  authDomain: 'glossary-kurosame.firebaseapp.com',
  databaseURL: 'https://glossary-kurosame.firebaseio.com',
  projectId: 'glossary-kurosame',
  storageBucket: 'glossary-kurosame.appspot.com',
  messagingSenderId: '167100381499',
  appId: process.env['LOCAL_FIREBASE_APP_ID']
    ? process.env['LOCAL_FIREBASE_APP_ID']
    : '1:167100381499:web:d7aa553bbbe610f9509f1e'
}

export default config
