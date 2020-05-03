import { SET_LOADING_LOGIN, LOGIN, SET_LOGIN, SET_ERROR } from './constants'

const initialState = {
  loading: false,
  error: false,
  isLogin: localStorage.getItem('token') ? true : false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN: {
      return { ...state }
    }

    case SET_LOADING_LOGIN: {
      return { ...state, loading: payload }
    }

    case SET_LOGIN: {
      return { ...state, isLogin: payload }
    }

    case SET_ERROR: {
      return { ...state, error: payload }
    }

    default:
      return state
  }
}
