import React, { useState, createRef } from 'react'
import { DatePicker } from '@material-ui/pickers'
import Pdf from 'react-to-pdf'
import IconButton from '@material-ui/core/IconButton'
import WarningIcon from '@material-ui/icons/Warning'

import { post } from 'global/api'
import Button from 'components/shared/buttons'

import './style.css'

export const ReportsSummModal = () => {
  const [selectedDate1, setSelectedDate1] = useState(new Date())
  const [selectedDate2, setSelectedDate2] = useState(new Date())
  const [reports, setReports] = useState(null)
  const ref = createRef()

  const handleDateChange1 = async (date) => {
    const data = { from: date.toISOString(), to: selectedDate2.toISOString() }
    await post(data, 'reports/generate').then(({ data }) => setReports(data.income))
    setSelectedDate1(date)
  }

  const handleDateChange2 = async (date) => {
    const data = { from: selectedDate1.toISOString(), to: selectedDate2.toISOString() }
    await post(data, 'reports/generate').then(({ data }) => setReports(data.income))
    setSelectedDate2(date)
  }

  const onClick = async () => {
    const data = { from: selectedDate1.toISOString(), to: selectedDate2.toISOString() }
    await post(data, 'reports/generate').then(({ data }) => setReports(data.income))
  }

  const formatDate = (date) => {
    return (
      (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
      '/' +
      (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
      '/' +
      date.getFullYear()
    )
  }

  return (
    <div className="reports-profit-container">
      <div className="reports-profit-title">
        Get profit report <Button style={{ marginLeft: '15px' }} color="primary" text="get report" onClick={() => onClick()} />
        {reports && !!reports.length && (
          <Pdf targetRef={ref} filename={`profit-${formatDate(selectedDate1)}-${formatDate(selectedDate2)}.pdf`}>
            {({ toPdf }) => <Button style={{ marginLeft: '15px' }} color="primary" text="get pdf" onClick={toPdf} />}
          </Pdf>
        )}
      </div>
      <div>
        <DatePicker
          style={{ marginRight: '15px' }}
          autoOk
          ampm={false}
          variant="inline"
          maxDate={selectedDate2}
          inputVariant="outlined"
          value={selectedDate1}
          onChange={handleDateChange1}
          label="choose time start"
        />
        <DatePicker
          autoOk
          ampm={false}
          variant="inline"
          disablePast
          minDate={selectedDate1}
          inputVariant="outlined"
          value={selectedDate2}
          onChange={handleDateChange2}
          label="choose time end"
        />
      </div>
      {reports && (
        <>
          <div>
            {!reports.length && (
              <div className="profit-date-empty">
                <IconButton type="button">
                  <WarningIcon htmlColor="#ffca28" />
                </IconButton>
                report list is empty, choose another date
              </div>
            )}
            {!!reports.length && (
              <div className="pdf-profit" ref={ref}>
                {reports.map((el) => (
                  <>
                    <span className="pdf-profit-cinema">{el.cinema}</span>
                    <span className="pdf-profit-income">{el.income} руб</span>
                    <span className="pdf-profit-date">{selectedDate1.toISOString()} </span>
                    <span className="pdf-profit-date">{selectedDate2.toISOString()} </span>
                  </>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
