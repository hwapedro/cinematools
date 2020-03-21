import { call, takeLatest, put as putReducer } from 'redux-saga/effects'
import { post, put } from '../../global/api'

import { FETCH_PRODUCTS, CHANGE_PRODUCT } from './constants'
import { setProducts, setProduct } from './actions'

function* fetchProducts({ payload }) {
  // yield put(setLoading(true))
  const query = payload
  const { data } = yield call(post, query, 'shopItems/query')
  console.log(data)
  yield putReducer(setProducts(data.shopItems))
}

function* changeProduct({ payload }) {
  // yield put(setLoading(true))
  const { id } = payload
  const body = payload

  const { data } = yield call(put, body, `shopItems/${id}`)
  console.log(data)
  yield putReducer(setProduct(data.shopItem))
}

export default function* productSaga() {
  yield takeLatest(FETCH_PRODUCTS, fetchProducts)
  yield takeLatest(CHANGE_PRODUCT, changeProduct)
}
