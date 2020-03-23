import { combineReducers } from 'redux'

import auth from '../sagas/auth/reducer'
import products from '../sagas/products/reducer'
import actors from '../sagas/actors/reducer'

const createRootReducer = () =>
  combineReducers({
    auth,
    products,
    actors
  })

export default createRootReducer
