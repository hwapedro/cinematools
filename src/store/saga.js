import { fork } from 'redux-saga/effects'

import auth from '../sagas/auth/saga'
import products from '../sagas/products/saga'
import actors from '../sagas/actors/saga'
import smart from './smart/saga'

export default function* rootSaga() {
  yield fork(auth)
  yield fork(products)
  yield fork(actors)
  yield fork(smart)
}
