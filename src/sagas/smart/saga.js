import { call, takeLatest, put as putReducer } from 'redux-saga/effects'
import { post, put, del } from '../../global/api'

import { FETCH_ADD, FETCH_ALL, FETCH_CHANGE, FETCH_DELETE } from './constants'
import { setAddModel, setAllModel, setDeleteModel, setChangeModel } from './actions'

function* fetchAll({ payload }) {
  const { model } = payload
  const query = payload

  const { data } = yield call(post, query, `${model}/query`)
  yield putReducer(setAllModel(model, data.actors))
}

function* change({ payload }) {
  const { id, model } = payload
  const body = payload
  const { data } = yield call(put, body, `${model}/${id}`)
  yield putReducer(setAddModel(model, data.actor))
}

function* deleteItem({ payload }) {
  const { id, model } = payload
  const body = payload

  yield call(del, body, `${model}/${id}`)
  yield putReducer(setDeleteModel(model, id))
}

function* add({ payload }) {
  const { model } = payload
  const body = payload
  const { data } = yield call(post, body, `${model}/`)

  yield putReducer(setChangeModel(model, data.actor))
}

export default function* productSaga() {
  yield takeLatest(FETCH_ALL, fetchAll)
  yield takeLatest(FETCH_CHANGE, change)
  yield takeLatest(FETCH_DELETE, deleteItem)
  yield takeLatest(FETCH_ADD, add)
}
