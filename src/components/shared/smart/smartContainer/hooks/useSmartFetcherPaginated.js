import { useState, useEffect, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { smartActions } from 'store/smart/'
import { getItems, getHasMore, getTotal } from 'store/smart/selectors'

export const useSmartFetcherPaginated = ({ model, limit }) => {
  const dispatch = useDispatch()
  console.log(model)
  const items = useSelector(state => getItems(state, model))
  const hasMore = useSelector(state => getHasMore(state, model))
  const total = useSelector(state => getTotal(state, model))
  const [skip, setSkip] = useState(0)

  useEffect(() => {
    dispatch(smartActions[model].all(limit, skip))
  }, [skip])

  const next = useCallback(() => {
    setSkip(skip + limit)
    dispatch(smartActions[model].all(limit + skip, skip))
  }, [])

  const prev = useCallback(() => {
    setSkip(skip ? skip - limit : 0)
    dispatch(smartActions[model].all(limit, skip))
  }, [])

  const page = useMemo(() => skip / limit + 1, [skip])

  return {
    items,
    next,
    hasMore,
    total,
    page,
    prev
  }
}
