import React from 'react'

import Button from '../../../shared/buttons'
import './style.css'

export const FilmItem = ({ film, setEditMode, setFilm }) => {
  return (
    <div className="showtime-film-item">
      <div className="showtime-image-container">
        <img src={film.image} alt="" />
      </div>
      <div className="showtime-image-info-container">
        <div>
          <span className="showtime-info-name-value">{film.name}</span>
        </div>
        <div>
          <span className="showtime-info-description-title">description </span>
          <span className="showtime-info-description-value">{film.description}</span>
        </div>
        <div>
          <span className="showtime-info-description-title">start date </span>
          <span className="showtime-info-description-value">{film.distributionStartDate}</span>
        </div>
        <div>
          <span className="showtime-info-description-title">end date </span>
          <span className="showtime-info-description-value">{film.distributionEndDate}</span>
        </div>
        <div className="showtime-button-container">
          <Button
            color="primary"
            text="add show times"
            onClick={() => {
              setFilm(film)
              setEditMode(true)
            }}
          />
        </div>
      </div>
    </div>
  )
}
