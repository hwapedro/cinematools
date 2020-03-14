import { call, takeLatest, all, put } from 'redux-saga/effects'
import { post } from '../../global/api'

import { IN_LOGIN } from './constants'

function* fetchLogin({ payload }) {
  yield call(post, payload, 'lol')
}

export default function* profileSaga() {
  yield takeLatest(IN_LOGIN, fetchLogin)
}
