import React, { useState } from 'react'

import { DateTimePicker } from '@material-ui/pickers'
import { useDispatch } from 'react-redux'
import { smartActions } from 'store/smart/'

import Select from 'react-select'

import Button from '../../../shared/buttons'

export const ShowTimeConstructor = ({ filmId, cinemaId, value, setEditMode, halls }) => {
  const dispatch = useDispatch()
  const optionsHalls = halls.map((hall) => ({ value: hall._id, label: hall.name }))
  const [selectedDate, handleDateChange] = useState(new Date())
  const [selectedHall, setHall] = useState(null)

  const onSubmit = () => {
    dispatch(
      smartActions['showtimes'].add({
        film: filmId,
        cinema: cinemaId,
        hall: selectedHall.value,
        time: selectedDate.toISOString(),
      })
    )
    setEditMode(false)
  }

  const handleChange = (selectedOption) => {
    setHall(selectedOption)
  }

  return (
    <div>
      <DateTimePicker
        autoOk
        ampm={false}
        variant="inline"
        disablePast
        inputVariant="outlined"
        value={selectedDate}
        onChange={handleDateChange}
        label="choose time"
      />

      <Select value={selectedHall} onChange={handleChange} options={optionsHalls} />
      <Button color="primary" text={value ? 'change' : 'add'} onClick={() => onSubmit()} />
      <Button color="primary" text="cansel" onClick={() => setEditMode(false)} />
    </div>
  )
}
