import { useState, useEffect, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { smartActions } from 'store/smart/'
import { getItems, getHasMore, getTotal } from 'store/smart/selectors'

export const useSmartFetcherPaginated = ({ model, limit }) => {
  const dispatch = useDispatch()
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
  }, [skip, limit, dispatch])

  const prev = useCallback(() => {
    setSkip(skip ? skip - limit : 0)
    dispatch(smartActions[model].all(limit, skip))
  }, [skip, limit, dispatch])

  const page = useMemo(() => skip / limit + 1, [skip, limit])

  return {
    items,
    next,
    hasMore,
    setSkip,
    total,
    page,
    prev
  }
}
