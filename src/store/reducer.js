import { combineReducers } from 'redux'

import auth from 'sagas/auth/reducer'
import { smartReducers } from './smart'

const createRootReducer = () =>
  combineReducers({
    auth,
    ...smartReducers
  });

export default createRootReducer
