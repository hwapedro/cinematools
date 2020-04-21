import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { smartActions } from 'store/smart/'
import { getItem } from 'store/smart/selectors'

export const useFilmFetcher = ({ model, filmId, cinemaId }) => {
  const dispatch = useDispatch()
  const halls = useSelector((state) => getItem(state, 'halls'))

  useEffect(() => {
    dispatch(smartActions['halls'].all(100, 0))
  }, [])

  return halls
}

