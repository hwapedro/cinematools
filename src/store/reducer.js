import { combineReducers } from 'redux'

import auth from '../sagas/auth/reducer'
import products from '../sagas/products/reducer'

const createRootReducer = () =>
  combineReducers({
    auth,
    products
  })

export default createRootReducer
