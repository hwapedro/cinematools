import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { DateTimePicker } from '@material-ui/pickers'
import { useDispatch } from 'react-redux'
import WarningIcon from '@material-ui/icons/Warning'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import MuiAlert from '@material-ui/lab/Alert'

import { smartActions } from 'store/smart/'
import { useFilmFetcher } from '../hooks/useFilmFetcher'
import { useShowTimePaginateFetcher } from '../hooks/useShowTimePaginateFetcher'
import { ShowTimeItem } from '../showTimeItem'
import Button from '../../../shared/buttons'
import { getLoading, getError } from 'store/smart/selectors'

import './style.css'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontWeight: '400',
  }),
  control: (base, state) => ({
    ...base,
    padding: '10px',
  }),
  input: (base, state) => ({
    ...base,
    color: 'black',
    fontWeight: '400',
  }),
  placeholder: (base, state) => ({
    ...base,
    color: 'black',
    fontWeight: '400',
  }),
  valueContainer: (base, state) => ({
    ...base,
    color: 'black',
    fontWeight: '400',
  }),
}

export const ShowTimeConstructor = ({ selectedFilm, cinemaId, value, setEditMode }) => {
  const dispatch = useDispatch()

  const { showtimes, next, prev, page, hasMore, total, limit } = useShowTimePaginateFetcher({ filmId: selectedFilm._id, cinemaId: cinemaId })
  const { film, halls } = useFilmFetcher({ model: 'films', filmId: selectedFilm._id, cinemaId: cinemaId })

  const error = useSelector((state) => getError(state, 'showtimes'))
  const loadingHalls = useSelector((state) => getLoading(state, 'halls'))

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedHall, setHall] = useState(null)

  const optionsHalls = halls.map((hall) => ({ value: hall._id, label: hall.name }))

  const content = showtimes.map((showtime) => <ShowTimeItem showtime={showtime} />)

  useEffect(() => {
    if (!showtimes.length && page !== 1) {
      prev()
    }
    if (halls.length) {
      setHall({ value: halls[0]._id, label: halls[0].name })
    }
  }, [halls, showtimes])


  const onSubmit = () => {
    dispatch(
      smartActions['showtimes'].add({
        film: selectedFilm._id,
        cinema: cinemaId,
        hall: selectedHall.value,
        time: selectedDate.toISOString(),
      })
    )
  }

  const handleDateChange = (date) => {
    dispatch(smartActions['showtimes'].setError(false))
    setSelectedDate(date)
  }

  const handleChange = (selectedOption) => {
    setHall(selectedOption)
  }

  if (loadingHalls) {
    return (
      <div className="showtime-loader-container">
        <CircularProgress />
      </div>
    )
  }

  if (!halls.length) {
    return (
      <>
        <div>
          <IconButton type="button" color="secondary">
            <WarningIcon style={{ height: '35px', width: '35px' }} color="secondary" />
          </IconButton>
          <span className="showtime-halls-isempty">halls are not full, add halls first to add show times</span>
        </div>
      </>
    )
  }

  return (
    <div className="showtime-constructor-container-datetimepicker">
      <div className="showtime-constructor-datetimepicker-main">
        <span className="showtime-constructor-datetimepicker-title">Create show time for {film.name} 👾</span>
        <span className="showtime-constructor-datetimepicker-buttons">
          <Button style={{ marginRight: '10px' }} color="primary" text="add" onClick={() => onSubmit()} />
          <Button style={{ marginRight: '15px' }} color="primary" text="cansel" onClick={() => setEditMode(false)} />
          {!!total && (
            <Box component="div" display="inline">
              <Button type="button" color="primary" text="<" disabled={page === 1} onClick={prev} />
              <span className="main-pages-count">
                {page} / {Math.ceil(total / limit)}
              </span>
              <Button type="button" color="primary" text=">" disabled={!hasMore} onClick={next} />
            </Box>
          )}
        </span>
      </div>
      <div className="showtime-constructor-datetimepicker-select">
        <div className="showtime-select-container">
          <Select styles={customStyles} value={selectedHall} onChange={handleChange} options={optionsHalls} />
        </div>
        <DateTimePicker
          autoOk
          ampm={false}
          variant="inline"
          disablePast
          minDate={selectedFilm.distributionStartDate}
          maxDate={selectedFilm.distributionEndDate}
          inputVariant="outlined"
          value={selectedDate}
          onChange={handleDateChange}
          label="choose time"
        />
      </div>
      {error && <Alert severity="error">Error: Time overlap found, please select another time.</Alert>}
      <div className="showtime-items-container">{content}</div>
    </div>
  )
}
