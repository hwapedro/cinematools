import { LOGIN, SET_LOADING_LOGIN, SET_LOGIN, LOGOUT } from './constants'

export const login = (email, password) => ({
  type: LOGIN,
  payload: { email, password },
})

export const logout = (email, password) => ({
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
