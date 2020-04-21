import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { smartActions } from 'store/smart/'
import { getItem, getItems } from 'store/smart/selectors'

export const useFilmFetcher = ({ model, filmId, cinemaId }) => {
  const dispatch = useDispatch()
  const film = useSelector((state) => getItem(state, model))
  const showtimes = useSelector((state) => getItems(state, 'showtimes'))
  const halls = useSelector((state) => getItems(state, 'halls'))

  useEffect(() => {
    dispatch(smartActions[model].one(filmId))
    dispatch(smartActions['halls'].all(100, 0))
    dispatch(smartActions['showtimes'].all(100, 0, { film: filmId, cinema: cinemaId }))
  }, [])

  return { film, showtimes, halls }
}

