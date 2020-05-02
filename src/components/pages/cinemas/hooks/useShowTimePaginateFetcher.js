import { useState, useEffect, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { smartActions } from 'store/smart/'
import { getItems, getHasMore, getTotal, getLimit } from 'store/smart/selectors'

export const useShowTimePaginateFetcher = ({ filmId, cinemaId }) => {
  const dispatch = useDispatch()
  const limit = useSelector((state) => getLimit(state, 'showtimes'))
  const showtimes = useSelector((state) => getItems(state, 'showtimes'))
  const hasMore = useSelector((state) => getHasMore(state, 'showtimes'))
  const total = useSelector((state) => getTotal(state, 'showtimes'))
  const [skip, setSkip] = useState(0)

  useEffect(() => {
    dispatch(smartActions['showtimes'].all(skip, limit, { film: filmId, cinema: cinemaId }))
  }, [skip, total])

  const next = useCallback(() => {
    setSkip(skip + limit)
    dispatch(smartActions['showtimes'].all(limit + skip, skip, { film: filmId, cinema: cinemaId }))
  }, [skip, limit, dispatch])

  const prev = useCallback(() => {
    setSkip(skip ? skip - limit : 0)
    dispatch(smartActions['showtimes'].all(limit, skip, { film: filmId, cinema: cinemaId }))
  }, [skip, limit, dispatch])

  const page = useMemo(() => skip / limit + 1, [skip, limit])

  return {
    showtimes,
    next,
    hasMore,
    setSkip,
    total,
    page,
    prev,
    limit,
  }
}
