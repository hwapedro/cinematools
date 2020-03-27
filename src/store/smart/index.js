import { createSlice } from '@reduxjs/toolkit'
import models from 'components/shared/smart/smartConstructor/models'

export const crateSmartSlice = model => {
  const slice = createSlice({
    name: model,
    initialState: {
      items: [],
      hasMore: false,
      total: 0,
    },
    reducers: {
      all: (state, action) => { },
      add: (state, action) => { },
      change: (state, action) => { },
      delete: (state, action) => { },
      setAll: (state, { payload }) => {
        state.items = payload;
      },
      setAdd: (state, { payload }) => {
        state.items.splice(0, 0, payload);
      },
      setDelete: (state, { payload }) => {
        state.items = state.items.filter(item => item._id !== payload._id);
      },
      setChange: (state, { payload }) => {
        const pos = state.items.findIndex(item => item._id === payload._id);
        if (pos > -1)
          state.items[pos] = payload;
      },
      setHasMore: (state, { payload }) => {
        state.hasMore = payload;
      },
      setTotal: (state, { payload }) => {
        state.total = payload;
      }
    },
  });
  const actions = slice.actions;
  const reducer = slice.reducer;
  return {
    actions,
    reducer
  };
}

export const smartActions = {};
export const smartReducers = {};

Object.keys(models)
  .filter(model => (!['actors', 'products'].includes(model)))
  .forEach(model => {
    const { actions, reducer } = crateSmartSlice(model);
    smartActions[model] = {};
    Object.entries(actions).
      forEach(([action, actionFn]) => {
        if (action === 'all') {
          smartActions[model][action] = (limit, skip, data = {}) => actionFn({ model, limit, skip, ...data });
        } else if (action === 'add') {
          smartActions[model][action] = (data) => actionFn({ model, ...data });
        } else if (action === 'change') {
          smartActions[model][action] = (id, data) => actionFn({ model, id, ...data });
        } else if (action === 'delete') {
          smartActions[model][action] = (id) => actionFn({ model, id, });
        } else {
          smartActions[model][action] = actionFn;
        }
        Object.defineProperty(smartActions[model][action], 'rawType', {
          value: actionFn.type,
        });
      });
    smartReducers[model] = reducer;
    return reducer;
  });
console.log(smartActions);

export default crateSmartSlice;