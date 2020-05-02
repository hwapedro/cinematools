import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { FilmItem } from './filmItem'
import { useCinemaFetcher } from './hooks/useCinemaFetcher'
import { ShowTimeConstructor } from './showTimeConstructor'

import './style.css'

export const CinemaPage = () => {
  const params = useParams()
  const cinema = useCinemaFetcher({ model: 'cinemas', cinemaId: params.cinemaId })
  const [selectedFilm, setFilm] = useState()
  const [editMode, setEditMode] = useState(false)

  const filmList = cinema.films && cinema.films.map((film) => <FilmItem film={film} setEditMode={setEditMode} setFilm={setFilm} />)

  return (
    <div className="showtime-cinema-container">
      {!editMode ? (
        <>
          <div className="showtime-cinema-title">{cinema.name}</div>
          <div className="showtime-cinema-address">{cinema.address}</div>
          <div className="showtime-cinema-container-items"> {filmList}</div>
        </>
      ) : (
        <ShowTimeConstructor setEditMode={setEditMode} selectedFilm={selectedFilm} cinemaId={params.cinemaId} />
      )}
    </div>
  )
}
