import {SET_LOADING_LOGIN, LOGIN } from './constants'

const initialState = {
  loading: false
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case LOGIN: {
      return { ...state }
    }

    case SET_LOADING_LOGIN: {
      console.log(payload)
      return { ...state, loading: payload }
    }

    default:
      return state
  }
}
