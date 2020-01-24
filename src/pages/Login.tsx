import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import uiConfig from '@/firebase/ui-config'
import firebase from '@/firebase/index'
import { States } from '@/modules/states'
import { LoginActions, LoginState, setIsLogin } from '@/modules/login'

interface Props {
  state: { login: LoginState }
  actions: LoginActions
  store?: unknown
}

class Login extends React.PureComponent<Props> {
  componentDidMount(): void {
    firebase
      .auth()
      .onAuthStateChanged(user =>
        this.props.actions.setIsLogin({ isLogin: !!user })
      )
  }

  public render(): JSX.Element | null {
    if (this.props.state.login.isLogin) return null
    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    )
  }
}

export default connect(
  (states: States) => ({ state: { login: states.login } }),
  (dispatch: Dispatch) => ({
    actions: {
      setIsLogin: bindActionCreators(setIsLogin, dispatch)
    }
  })
)(Login)
