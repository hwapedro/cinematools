import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import createRootReducer from './reducer'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware, logger]

const store = createStore(createRootReducer(), applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)

export default store
