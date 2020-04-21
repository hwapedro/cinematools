import React from 'react'
import Button from '../../../shared/buttons'
import { smartActions } from 'store/smart/'
import { useDispatch } from 'react-redux'

export const ShowTimeItem = ({ showtime }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <div>{showtime.date}</div>
      <div>{showtime.hall.name}</div>
      <Button type="button" color="secondary" text="delete" onClick={() => dispatch(smartActions['showtimes'].delete(showtime._id))} />
    </div>
  )
}
