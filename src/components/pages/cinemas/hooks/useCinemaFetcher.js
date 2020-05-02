import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { smartActions } from 'store/smart/'
import { getItem } from 'store/smart/selectors'

export const useCinemaFetcher = ({ model, cinemaId }) => {
  const dispatch = useDispatch()
  const cinema = useSelector((state) => getItem(state, model))

  useEffect(() => {
    dispatch(smartActions[model].one(cinemaId))
  }, [])

  return cinema
}

