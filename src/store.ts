import { counter } from '@/modules/counter'
import { IStates } from '@/modules/index'
import rootSaga from '@/sagas/index'
import {
  applyMiddleware,
  combineReducers,
  createStore,
  StoreEnhancer
} from 'redux'
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

export default createStore(combineReducers<IStates>({ counter }), enhancer)

sagaMiddleware.run(rootSaga)
