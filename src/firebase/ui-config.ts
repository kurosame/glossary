import firebase from 'firebase/app'
import 'firebase/auth'

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
}

export default uiConfig
