# Glossary App

[Glossary](https://glossary-kurosame.firebaseapp.com)

Deploy to Firebase Hosting is done on CircleCI

## Technology stack

- React
- React Hooks
- Redux
- Ducks(Design pattern)
- TypeScript
- styled-components
- Material-UI
- Firebase
- CircleCI

## Usage(Local environment)

```sh
git clone https://github.com/kurosame/glossary.git
npm install
```

## Testing to push notification

After allowing push notifications, request like the following

```sh
curl -i -X POST \
  -H "Authorization:key=YOUR_FIREBASE_SERVER_KEY" \
  -H "Content-Type:application/json" \
  -d \
    '{
      "data": {
        "title":"test",
        "body":"testtest"
      },
      "to": "YOUR_DEVICE_TOKEN"
    }' \
'https://fcm.googleapis.com/fcm/send'
```

## Tasks

```sh
npm start                 # Run webpack-dev-server
npm run build             # Build for development
npm run build:production  # Build for production
npm test                  # Unit test (Jest + vue-test-utils)
npm run test:ci           # Unit test for CI
npm run clean:cache       # Clear cache of webpack
npm run clean:dist        # Clear dist directory
```

## License

MIT
