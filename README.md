# Glossary

[Glossary](https://glossary-kurosame.firebaseapp.com)

Deploy to Firebase Hosting is done on CircleCI

## Technology stack

- React
- React Hooks
- Redux
- Ducks(Design pattern)
- TypeScript
- Emotion
- Material-UI
- Firebase
- CircleCI

## Usage(Local environment)

```sh
git clone https://github.com/kurosame/glossary.git
npm install
```

To run, create .env file then set the following

```sh
LOCAL_FIREBASE_API_KEY # Firebase api key for local
LOCAL_FIREBASE_APP_ID  # Firebase app id for local
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
        "message":"test message"
      },
      "to": "YOUR_DEVICE_TOKEN"
    }' \
'https://fcm.googleapis.com/fcm/send'
```

## License

MIT
