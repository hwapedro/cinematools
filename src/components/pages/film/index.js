import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFilmFetcher } from './hooks/useFilmFetcher'
import Button from '../../shared/buttons'

import { ShowTimeItem } from './showTimeItem'
import { ShowTimeConstructor } from './showTimeConstructor'

export const FilmPage = () => {
  const params = useParams()
  const { film, showtimes, halls } = useFilmFetcher({ model: 'films', filmId: params.filmId, cinemaId: params.cinemaId })
  const [editMode, setEditMode] = useState(false)

  const content = showtimes.map((showtime) => <ShowTimeItem showtime={showtime} />)

  return (
    <div>
      <div>название фильма {film.name}</div>
      {content}

      <Button color="primary" text="add" onClick={() => setEditMode(true)} />
      <div>{editMode && <ShowTimeConstructor setEditMode={setEditMode} halls={halls} filmId={params.filmId} cinemaId={params.cinemaId} />}</div>
    </div>
  )
}
