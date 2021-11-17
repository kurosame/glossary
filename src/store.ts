import { login } from '@/modules/login'
import type { States } from '@/modules/states'
import { words } from '@/modules/word'
import rootSaga from '@/sagas/index'
import { applyMiddleware, combineReducers, createStore, StoreEnhancer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import saga from 'redux-saga'

const sagaMiddleware = saga()
let enhancer: StoreEnhancer
if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(sagaMiddleware)
} else {
  enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
}

export default createStore(combineReducers<States>({ login, words }), enhancer)

sagaMiddleware.run(rootSaga)
