import { onAuthStateChanged, User } from 'firebase/auth'
import React, { SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { Dispatch } from 'redux'

import FirebaseAuth from '@/components/FirebaseAuth'
import { auth } from '@/firebase/index'
import uiConfig from '@/firebase/ui-config'
import { SET_IS_LOGIN } from '@/modules/login'
import type { States } from '@/modules/states'

const useSetUser = (su: React.Dispatch<SetStateAction<User | null>>): void =>
  useEffect(() => onAuthStateChanged(auth(), u => su(u)))

const useSetIsLogin = (u: User | null): void => {
  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    dispatch({ type: SET_IS_LOGIN, payload: { isLogin: !!u } })
  }, [u, dispatch])
}

const Login: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const isLogin = useSelector<States, boolean>(s => s.login.isLogin)

  useSetUser(setUser)
  useSetIsLogin(user)

  if (isLogin) return null
  return <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
}

export default Login
