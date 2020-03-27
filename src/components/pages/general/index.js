import React, { useState, useEffect } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { useDispatch, useSelector } from 'react-redux'
import smartActions from 'store/smart/actions';
import { SmartConstructor } from '../../shared/smart/smartConstructor'
import { useCallback } from 'react';
import { GeneralItem } from './item/GeneralItem';

const useItemsFetcherPaginated = ({ model, limit }) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state[model] && state[model].items || []);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    dispatch(smartActions[model].all(limit, skip))
  }, []);

  const next = useCallback(() => {
    dispatch(smartActions[model].all(limit, skip));
  }, [dispatch, limit]);

  const prev = useCallback(() => {
    dispatch(smartActions[model].all(limit, skip));
  }, [dispatch, limit]);

  return {
    items,
    next,
    prev,
  };
}

export const GeneralPage = ({ model }) => {
  const { items, next, prev } = useItemsFetcherPaginated({ model, limit: 10 });
  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={() => setEditMode(true)}>
        <AddIcon />
      </Fab>
      {items.map(item => (
        <GeneralItem item={item} key={item._id} model={model} />
      ))}
      {editMode && <SmartConstructor model={model} setEditMode={setEditMode} />}
    </div>
  )
}