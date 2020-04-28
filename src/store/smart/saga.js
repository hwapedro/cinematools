import { call, takeLatest, put as putReducer, all, fork } from 'redux-saga/effects'
import { get, post, put, del } from '../../global/api'

import { smartActions } from '../smart'

const getSingular = (model) => (model === 'news' ? model : model.slice(0, -1))

function* fetchAll({ payload }) {
  const { model, limit, skip, ...conditions } = payload

  const { data } = yield call(post, { limit, skip, conditions }, `${model}/query`)
  yield putReducer(smartActions[model].setAll(data[model]))
  yield putReducer(smartActions[model].setHasMore(data.hasMore))
  yield putReducer(smartActions[model].setTotal(data.total))
}

function* fetchOne({ payload }) {
  const { model, id } = payload

  const { data } = yield call(get, `${model}/${id}`)
  const singleModel = getSingular(model)
  yield putReducer(smartActions[model].setOne(data[singleModel]))
}

function* change({ payload }) {
  const { id, model } = payload
  const body = payload
  if (body.image) {
    const imageUploadBody = new FormData()
    imageUploadBody.append('file', body.image[0])
    const {
      data: { _id, url },
    } = yield call(post, imageUploadBody, `images/upload`)
    if (!url) {
      throw new Error('Error on image upload')
    }
    body.image = url
  }
  const { data } = yield call(put, body, `${model}/${id}`)
  const singleModel = getSingular(model)
  yield putReducer(smartActions[model].setChange(data[singleModel]))
}

function* deleteItem({ payload }) {
  const { id, model } = payload
  const body = payload

  yield call(del, body, `${model}/${id}`)
  yield putReducer(smartActions[model].setDelete({ _id: id }))
}

function* add({ payload }) {
  const { model } = payload
  const body = payload

  // modify body in case there are images
  if (body.image) {
    const imageUploadBody = new FormData()
    imageUploadBody.append('file', body.image[0])
    const {
      data: { _id, url },
    } = yield call(post, imageUploadBody, `images/upload`)
    if (!url) {
      throw new Error('Error on image upload')
    }
    body.image = url
  }
  const { data } = yield call(post, body, `${model}/`)
  const singleModel = getSingular(model)
  yield putReducer(smartActions[model].setAdd(data[singleModel]))
}

export default function* smartSaga() {
  for (const model of Object.keys(smartActions)) {
    yield takeLatest(smartActions[model].all.rawType, fetchAll)
    yield takeLatest(smartActions[model].one.rawType, fetchOne)
    yield takeLatest(smartActions[model].change.rawType, change)
    yield takeLatest(smartActions[model].delete.rawType, deleteItem)
    yield takeLatest(smartActions[model].add.rawType, add)
  }
}
