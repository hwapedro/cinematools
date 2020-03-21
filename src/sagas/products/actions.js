import { FETCH_PRODUCTS, SET_PRODUCTS, CHANGE_PRODUCT, SET_PRODUCT } from './constants'

export const fetchProducts = (limit, skip) => ({
  type: FETCH_PRODUCTS,
  payload: { limit, skip }
})

export const changeProduct = (id, name, price, inStock) => ({
  type: CHANGE_PRODUCT,
  payload: { id, name, price, inStock }
})

export const setProducts = data => ({
  type: SET_PRODUCTS,
  payload: data
})

export const setProduct = data => ({
  type: SET_PRODUCT,
  payload: data
})
