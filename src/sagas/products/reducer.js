import { SET_ADD_PRODUCT, SET_ALL_PRODUCTS, SET_CHANGE_PRODUCT, SET_DELETE_PRODUCT } from './constants'

const initialState = {
  products: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ALL_PRODUCTS: {
      return { ...state, products: payload }
    }

    case SET_CHANGE_PRODUCT: {
      return {
        ...state,
        products: state.products.map(product => {
          return product._id === payload._id ? payload : product
        })
      }
    }

    case SET_DELETE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter(products => products._id !== payload._id)
      }
    }

    case SET_ADD_PRODUCT: {
      return {
        ...state,
        products: [...state.products, payload]
      }
    }

    default:
      return state
  }
}
