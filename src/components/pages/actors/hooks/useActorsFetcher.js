import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchActors } from '../../../../sagas/actors/actions'
import { getActorss } from '../../../../sagas/actors/selectors'

export const useActorsFetcher = () => {
  const dispatch = useDispatch()
  const actors = useSelector(getActorss)

  useEffect(() => {
    dispatch(fetchActors(10, 0))
  }, [])

  return actors
}
