# Glossary App

https://glossary-kurosame.firebaseapp.com

Deploy to Firebase Hosting is done on CircleCI

## Technology stack

- React
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
yarn install
```

## Tasks

```sh
yarn start            # webpack-dev-server localhost:8000
yarn build            # Build for development
yarn build:production # Build for production
yarn test             # Unit test (jest + enzyme)
yarn test:ci          # Unit test for CI
yarn e2e              # E2E test (jest + puppeteer)
yarn e2e:ci           # E2E test for CI
yarn clean            # Clear the dist directory
```

## License

MIT
