# Glossary App

https://glossary-kurosame.firebaseapp.com

Deploy to Firebase Hosting is done on CircleCI

## Technology stack

- React
- React Hooks
- Redux
- Ducks(Design pattern)
- TypeScript
- styled-components
- Material-UI
- Cypress
- Firebase
- CircleCI

## Usage(Local environment)

```sh
git clone https://github.com/kurosame/glossary.git
npm install
```

## Tasks

```sh
npm start                 # Run webpack-dev-server
npm run start:e2e         # Run webpack-dev-server for E2E test
npm run build             # Build for development
npm run build:production  # Build for production
npm test                  # Unit test (Jest + vue-test-utils)
npm run test:ci           # Unit test for CI
npm run e2e               # E2E test (Cypress)
npm run e2e:ci            # E2E test for CI
npm run e2e:run           # Run Cypress for E2E test
npm run e2e:run:ci        # Run Cypress for E2E test for CI
npm run clean:cache       # Clear cache of webpack
npm run clean:dist        # Clear dist directory
npm run clean:screenshots # Clear screenshots of Cypress
```

## License

MIT
