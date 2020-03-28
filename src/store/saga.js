import { fork } from 'redux-saga/effects'

import auth from 'sagas/auth/saga'
import smart from './smart/saga'

export default function* rootSaga() {
  yield fork(auth)
  yield fork(smart)
}
