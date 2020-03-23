import { SET_ADD_ACTOR, SET_ALL_ACTORS, SET_CHANGE_ACTOR, SET_DELETE_ACTOR } from './constants'

const initialState = {
  actors: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ALL_ACTORS: {
      return { ...state, actors: payload }
    }

    case SET_CHANGE_ACTOR: {
      console.log(state.actors,payload._id, payload)
      return {
        ...state,
        actors: state.actors.map(actor => {
          return actor._id === payload._id ? payload : actor
        })
      }
    }

    case SET_DELETE_ACTOR: {
      return {
        ...state,
        actors: state.actors.filter(actors => actors._id !== payload._id)
      }
    }

    case SET_ADD_ACTOR: {
      return {
        ...state,
        actors: [...state.actors, payload]
      }
    }

    default:
      return state
  }
}
