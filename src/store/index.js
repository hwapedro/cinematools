import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import createRootReducer from './reducer'
// import rootSaga from './saga'
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware, logger]

const store = configureStore({
  reducer: createRootReducer(),
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    ...middlewares,
  ]
})

sagaMiddleware.run(require('./saga').default)

export default store
