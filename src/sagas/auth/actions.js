import { IN_LOGIN } from './constants'

export const login = data => ({
  type: IN_LOGIN,
  payload: data
})
