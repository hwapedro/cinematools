import {
  FETCH_ADD_PRODUCT,
  FETCH_ALL_PRODUCTS,
  FETCH_CHANGE_PRODUCT,
  FETCH_DELETE_PRODUCT,
  SET_ADD_PRODUCT,
  SET_ALL_PRODUCTS,
  SET_CHANGE_PRODUCT,
  SET_DELETE_PRODUCT
} from './constants'

export const fetchProducts = (limit, skip) => ({
  type: FETCH_ALL_PRODUCTS,
  payload: { limit, skip }
})

export const setProducts = data => ({
  type: SET_ALL_PRODUCTS,
  payload: data
})

export const changeProduct = (id, name, price, inStock) => ({
  type: FETCH_CHANGE_PRODUCT,
  payload: { id, name, price, inStock }
})

export const setProduct = data => ({
  type: SET_CHANGE_PRODUCT,
  payload: data
})

export const deleteProduct = id => ({
  type: FETCH_DELETE_PRODUCT,
  payload: { id }
})

export const setDeleteProduct = id => ({
  type: SET_DELETE_PRODUCT,
  payload: { _id: id }
})

export const addProduct = (name, price, inStock) => ({
  type: FETCH_ADD_PRODUCT,
  payload: { name, price, inStock }
})

export const setAddProduct = data => ({
  type: SET_ADD_PRODUCT,
  payload: data
})
