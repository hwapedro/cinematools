import { FETCH_ADD, FETCH_ALL, FETCH_CHANGE, FETCH_DELETE } from './constants'

export const fetchModel = (model, limit, skip) => ({
  type: FETCH_ALL,
  payload: { model, limit, skip }
})

export const addModel = (model, data) => ({
  type: FETCH_ADD,
  payload: { model, ...data }
})

export const changeModel = (model, id, data) => ({
  type: FETCH_CHANGE,
  payload: { model, id, ...data }
})

export const deleteModel = (model, id) => ({
  type: FETCH_DELETE,
  payload: { model, id }
})

export const setAllModel = (model, data) => ({
  type: `${model}/SET_ALL`,
  payload: data
})

export const setAddModel = (model, data) => ({
  type: `${model}/SET_ADD`,
  payload: data
})

export const setDeleteModel = (model, id) => ({
  type: `${model}/SET_DELETE`,
  payload: { _id: id }
})

export const setChangeModel = (model, data) => ({
  type: `${model}/SET_CHANGE`,
  payload: data
})
