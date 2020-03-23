import {
  FETCH_ADD_ACTOR,
  FETCH_ALL_ACTORS,
  FETCH_CHANGE_ACTOR,
  FETCH_DELETE_ACTOR,
  SET_ADD_ACTOR,
  SET_ALL_ACTORS,
  SET_CHANGE_ACTOR,
  SET_DELETE_ACTOR
} from './constants'

export const fetchActors = (limit, skip) => ({
  type: FETCH_ALL_ACTORS,
  payload: { limit, skip }
})

export const setActors = data => ({
  type: SET_ALL_ACTORS,
  payload: data
})

export const changeActor = (id, name, bio) => ({
  type: FETCH_CHANGE_ACTOR,
  payload: { id, name, bio }
})

export const setActor = data => ({
  type: SET_CHANGE_ACTOR,
  payload: data
})

export const deleteActor = id => ({
  type: FETCH_DELETE_ACTOR,
  payload: { id }
})

export const setDeleteActor = id => ({
  type: SET_DELETE_ACTOR,
  payload: { _id: id }
})

export const addActor = (name, bio) => ({
  type: FETCH_ADD_ACTOR,
  payload: { name, bio }
})

export const setAddActor = data => ({
  type: SET_ADD_ACTOR,
  payload: data
})
