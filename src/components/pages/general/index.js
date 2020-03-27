import React, { useState, useEffect, useMemo } from 'react'
import Fab from '@material-ui/core/Fab'
import Box from '@material-ui/core/Box'
import AddIcon from '@material-ui/icons/Add'
import { useDispatch, useSelector } from 'react-redux'
import smartActions from 'store/smart/actions';
import { SmartConstructor } from '../../shared/smart/smartConstructor'
import { useCallback } from 'react';
import { GeneralItem } from './item/GeneralItem';
import Button from 'components/shared/buttons';

const useItemsFetcherPaginated = ({ model, limit }) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state[model] ? state[model].items : []);
  const hasMore = useSelector(state => state[model] ? state[model].hasMore : false);
  const total = useSelector(state => state[model] ? state[model].total : false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    dispatch(smartActions[model].all(limit, skip))
  }, [skip]);

  const next = useCallback(() => {
    setSkip(skip + limit);
    dispatch(smartActions[model].all(limit + skip, skip));
  }, [dispatch, skip, limit]);

  const prev = useCallback(() => {
    setSkip(skip - limit);
    dispatch(smartActions[model].all(limit, skip));
  }, [dispatch, skip, limit]);

  const page = useMemo(() => (skip / limit) + 1, [skip]);

  return {
    items,
    next,
    hasMore,
    total,
    page,
    prev,
  };
}

export const GeneralPage = ({ model }) => {
  const limit = 3;
  const { items, next, prev, page, hasMore, total } = useItemsFetcherPaginated({ model, limit });
  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={() => setEditMode(true)}>
        <AddIcon />
      </Fab>
      {items.map(item => (
        <GeneralItem item={item} key={item._id} model={model} />
      ))}
      {/* трыц тыц пагинатор */}
      <hr />
      <Box component="div" display="inline">
        <Button type="button" color="primary" text="<" disabled={page === 1}
          onClick={prev}
        />
        <span>{page} of {Math.ceil(total / limit)}</span>
        <Button type="button" color="primary" text=">" disabled={!hasMore}
          onClick={next}
        />
      </Box>
      <hr />
      {editMode && <SmartConstructor model={model} setEditMode={setEditMode} />}
    </div>
  )
}