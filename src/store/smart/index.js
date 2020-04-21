import { createSlice } from '@reduxjs/toolkit'
import models from 'models'

export const createSmartSlice = model => {
  return createSlice({
    name: model,
    initialState: {
      item: {},
      items: [],
      hasMore: false,
      total: 0
    },
    reducers: {
      all: (state, action) => {},
      one: (state, action) => {},
      add: (state, action) => {},
      change: (state, action) => {},
      delete: (state, action) => {},
      setAll: (state, { payload }) => {
        state.items = payload
      },
      setAdd: (state, { payload }) => {
        state.items = [payload, ...state.items]
      },
      setOne: (state, { payload }) => {
        state.item = {...payload}
      },
      setDelete: (state, { payload }) => {
        state.items = state.items.filter(item => item._id !== payload._id)
      },
      setChange: (state, { payload }) => {
        state.items = state.items.map(item => (item._id === payload._id ? payload : item))
      },
      setHasMore: (state, { payload }) => {
        state.hasMore = payload
      },
      setTotal: (state, { payload }) => {
        state.total = payload
      }
    }
  })
}

export const smartActions = {}
export const smartReducers = {}

const modelsKeys = Object.keys(models)
const SAGA_ACTIONS = 5
modelsKeys.forEach(model => {
  const { actions, reducer } = createSmartSlice(model)

  smartActions[model] = {}
  const arrayOfActions = Object.entries(actions).slice(0, SAGA_ACTIONS)
  const arrayOfSetters = Object.entries(actions).slice(SAGA_ACTIONS)

  const [[alltype, all], [onetype, one], [addtype, add], [changetype, change], [deltype, del]] = arrayOfActions
  smartActions[model][alltype] = (limit, skip, data = {}) => all({ model, limit, skip, ...data })
  smartActions[model][onetype] = (id) => one({ model, id })
  smartActions[model][addtype] = data => add({ model, ...data })
  smartActions[model][changetype] = (id, data) => change({ model, id, ...data })
  smartActions[model][deltype] = id => del({ model, id })

  arrayOfSetters.forEach(([type, action]) => {
    smartActions[model][type] = action
  })

  arrayOfActions.forEach(([type, action]) => {
    smartActions[model][type].rawType = action.type
  })

  smartReducers[model] = reducer
  return reducer
})

export default createSmartSlice
