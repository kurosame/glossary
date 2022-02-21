import { GoogleAuthProvider } from 'firebase/auth'

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [GoogleAuthProvider.PROVIDER_ID]
}

export default uiConfig
