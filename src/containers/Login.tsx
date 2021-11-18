import type firebase from 'firebase'
import React, { SetStateAction, useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useDispatch, useSelector } from 'react-redux'
import type { Dispatch } from 'redux'
import firebaseApp from '@/firebase/index'
import uiConfig from '@/firebase/ui-config'
import { SET_IS_LOGIN } from '@/modules/login'
import type { States } from '@/modules/states'

const useSetUser = (su: React.Dispatch<SetStateAction<firebase.User | null>>): void =>
  useEffect(() => firebaseApp.auth().onAuthStateChanged(u => su(u)))

const useSetIsLogin = (u: firebase.User | null): void => {
  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    dispatch({ type: SET_IS_LOGIN, payload: { isLogin: !!u } })
  }, [u, dispatch])
}

const Login: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const isLogin = useSelector<States, boolean>(s => s.login.isLogin)

  useSetUser(setUser)
  useSetIsLogin(user)

  if (isLogin) return null
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseApp.auth()} />
}

export default Login
