import { call, takeLatest, put } from 'redux-saga/effects'
import { post } from '../../global/api'
import { setLoading, setLogin } from './actions'

import { LOGIN } from './constants'

function* login({ payload }) {
  yield put(setLoading(true))
  const { data } = yield call(post, payload, 'auth/login')
  if (data.token) {
    yield put(setLogin(true))
    localStorage.setItem('token', data.token)
  }
  yield put(setLoading(false))
}

export default function* profileSaga() {
  yield takeLatest(LOGIN, login)
}
