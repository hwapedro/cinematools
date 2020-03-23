import { call, takeLatest, put as putReducer } from 'redux-saga/effects'
import { post, put, del } from '../../global/api'

import { FETCH_ADD_ACTOR, FETCH_ALL_ACTORS, FETCH_CHANGE_ACTOR, FETCH_DELETE_ACTOR } from './constants'
import { setActors, setActor, setDeleteActor, setAddActor } from './actions'

function* fetchActors({ payload }) {
  const query = payload
  const { data } = yield call(post, query, 'actors/query')
  yield putReducer(setActors(data.actors))
}

function* change({ payload }) {
  const { id } = payload
  const body = payload

  const { data } = yield call(put, body, `actors/${id}`)
  console.log(data.actor)
  yield putReducer(setActor(data.actor))
}

function* deleteItem({ payload }) {
  const { id } = payload
  const body = payload

  yield call(del, body, `actors/${id}`)
  yield putReducer(setDeleteActor(id))
}

function* add({ payload }) {
  const body = payload
  const { data } = yield call(post, body, `actors/`)

  yield putReducer(setAddActor(data.actor))
}

export default function* productSaga() {
  yield takeLatest(FETCH_ALL_ACTORS, fetchActors)
  yield takeLatest(FETCH_CHANGE_ACTOR, change)
  yield takeLatest(FETCH_DELETE_ACTOR, deleteItem)
  yield takeLatest(FETCH_ADD_ACTOR, add)
}
