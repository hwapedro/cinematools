import { LOGIN, SET_LOADING_LOGIN, SET_LOGIN, LOGOUT, SET_ERROR } from './constants'

export const login = (email, password) => ({
  type: LOGIN,
  payload: { email, password },
})

export const logout = () => ({
  type: LOGOUT,
})

export const setLoading = (isLoading) => ({
  type: SET_LOADING_LOGIN,
  payload: isLoading,
})

export const setLogin = (isLogin) => ({
  type: SET_LOGIN,
  payload: isLogin,
})

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
})
