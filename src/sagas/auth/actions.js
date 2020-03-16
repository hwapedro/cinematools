import { LOGIN, SET_LOADING_LOGIN } from './constants'

export const login = data => ({
  type: LOGIN,
  payload: data
})

export const setLoading = isLoading => ({
  type: SET_LOADING_LOGIN,
  payload: isLoading
})
