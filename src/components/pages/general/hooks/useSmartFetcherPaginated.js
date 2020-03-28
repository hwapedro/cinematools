import { useState, useEffect, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { smartActions } from 'store/smart/'

export const useSmartFetcherPaginated = ({ model, limit }) => {
  const dispatch = useDispatch()
  const items = useSelector(state => (state[model] ? state[model].items : []))
  const hasMore = useSelector(state => (state[model] ? state[model].hasMore : false))
  const total = useSelector(state => (state[model] ? state[model].total : false))
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
