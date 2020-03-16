import { call, takeLatest, all, put } from 'redux-saga/effects'
import { post } from '../../global/api'
import { setLoading } from './actions'

import { LOGIN, SET_LOADING_LOGIN } from './constants'

function* fetchLogin(...props) {
  console.log('@2', props)
  yield put(setLoading(true))
  const data = yield call(post, props.payload, 'lol')
  console.log(data)
  yield put(setLoading(false))
}

export default function* profileSaga() {
  yield takeLatest(LOGIN, fetchLogin)
}
