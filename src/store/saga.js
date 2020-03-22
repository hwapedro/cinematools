import { fork } from 'redux-saga/effects'

import auth from '../sagas/auth/saga'
import products from '../sagas/products/saga'

export default function* rootSaga() {
  yield fork(auth)
  yield fork(products)
}