import { call, takeLatest, put } from 'redux-saga/effects'
import { post } from '../../global/api'
import { setLoading, setLogin } from './actions'

import { LOGIN, LOGOUT } from './constants'

function* login({ payload }) {
  yield put(setLoading(true))
  try {
    const { data } = yield call(post, payload, 'auth/login')
    if (data.token) {
      yield put(setLogin(true))
      localStorage.setItem('token', data.token)
    }
  } catch (error) {
    console.log(error)
  }

  yield put(setLoading(false))
}

function* logout() {
  yield put(setLogin(false))
  localStorage.removeItem('token')
}

export default function* profileSaga() {
  yield takeLatest(LOGIN, login)
  yield takeLatest(LOGOUT, logout)
}
