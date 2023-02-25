import type { Auth } from 'firebase/auth'
import type { auth } from 'firebaseui'
import React, { useEffect, useRef, useState } from 'react'

import { styled } from '@mui/system'

interface Props {
  uiConfig: auth.Config
  firebaseAuth: Auth
}

const StyledFirebaseAuth = styled('div')`
  ul {
    list-style: none;

    li {
      text-align: center;

      button {
        display: inline-flex;
        align-items: center;
        padding: 8px 16px;
        cursor: pointer;

        .firebaseui-idp-icon-wrapper {
          width: 18px;
          height: 18px;

          img {
            width: inherit;
            height: inherit;
          }
        }

        .firebaseui-idp-text-long {
          padding-left: 16px;
          font-weight: bold;
          color: #757575;
        }

        .firebaseui-idp-text-short {
          display: none;
        }
      }
    }
  }
`

const FirebaseAuth: React.FC<Props> = ({ uiConfig, firebaseAuth }) => {
  const [ui, setUi] = useState<typeof import('firebaseui') | null>(null)
  const elRef = useRef(null)

  useEffect(() => {
    import('firebaseui')
      .then(fui => {
        setUi(fui)
      })
      .catch((err: Error) => {
        console.error(`firebaseui setup error: ${err.message}`)
      })
  }, [])

  useEffect(() => {
    if (!ui || !elRef.current) return undefined

    const widget = ui.auth.AuthUI.getInstance() || new ui.auth.AuthUI(firebaseAuth)

    if (uiConfig.signInFlow === 'popup') widget.reset()

    widget.start(elRef.current, uiConfig)

    return () => {
      widget.reset()
    }
  }, [ui, uiConfig, firebaseAuth])

  return <StyledFirebaseAuth ref={elRef} />
}

export default FirebaseAuth
