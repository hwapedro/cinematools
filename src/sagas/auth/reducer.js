import { LOGIN_FAILED, IN_LOGIN } from './constants'

const initialState = {
  test: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case IN_LOGIN: {
      return { ...state }
    }

    default:
      return state
  }
}
