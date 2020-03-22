import { call, takeLatest, put as putReducer } from 'redux-saga/effects'
import { post, put, del } from '../../global/api'

import { FETCH_ADD_PRODUCT, FETCH_ALL_PRODUCTS, FETCH_CHANGE_PRODUCT, FETCH_DELETE_PRODUCT } from './constants'
import { setProducts, setProduct, setDeleteProduct, setAddProduct } from './actions'

function* fetchProducts({ payload }) {
  const query = payload
  const { data } = yield call(post, query, 'shopItems/query')
  yield putReducer(setProducts(data.shopItems))
}

function* change({ payload }) {
  const { id } = payload
  const body = payload

  const { data } = yield call(put, body, `shopItems/${id}`)
  yield putReducer(setProduct(data.shopItem))
}

function* deleteItem({ payload }) {
  const { id } = payload
  const body = payload

  yield call(del, body, `shopItems/${id}`)
  yield putReducer(setDeleteProduct(id))
}

function* add({ payload }) {
  const body = payload
  const { data } = yield call(post, body, `shopItems/`)

  yield putReducer(setAddProduct(data.shopItem))
}

export default function* productSaga() {
  yield takeLatest(FETCH_ALL_PRODUCTS, fetchProducts)
  yield takeLatest(FETCH_CHANGE_PRODUCT, change)
  yield takeLatest(FETCH_DELETE_PRODUCT, deleteItem)
  yield takeLatest(FETCH_ADD_PRODUCT, add)
}
