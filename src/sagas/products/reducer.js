import { SET_PRODUCTS, SET_PRODUCT } from './constants'

const initialState = {
  products: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PRODUCTS: {
      return { ...state, products: payload }
    }

    case SET_PRODUCT: {
      return {
        ...state,
        products: state.products.map(product => {
          console.log(product._id, payload._id,product._id === payload._id ,product._id === payload._id ? payload : product)
          return product._id === payload._id ? payload : product
        })
      }
    }

    default:
      return state
  }
}
