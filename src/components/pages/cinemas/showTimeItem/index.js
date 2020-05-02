import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'

import Button from '../../../shared/buttons'
import { smartActions } from 'store/smart/'
import { useDispatch } from 'react-redux'

import './style.css'

export const ShowTimeItem = ({ showtime }) => {
  const dispatch = useDispatch()

  return (
    <div className="showtime-item-container">
      <div className={`showtime-item-info`}>
        <span className={`showtime-item-hall-title`}>hall </span>
        <span className={`showtime-item-hall-value`}>{showtime.hall.name}</span>
      </div>
      <div className={`showtime-item-info`}>
        <span className={`showtime-item-start-title`}>start time </span>
        <span className={`showtime-item-start-value`}>{showtime.time}</span>
      </div>
      <div className="showtime-button-delete-container">
        <IconButton type="button" color="secondary" onClick={() => dispatch(smartActions['showtimes'].delete(showtime._id))}>
          <DeleteIcon color="secondary" />
        </IconButton>
      </div>
    </div>
  )
}
