import { combineReducers } from 'redux'

import auth from '../sagas/auth/reducer'

const createRootReducer = () =>
  combineReducers({
    auth
  })

export default createRootReducer
