import React from 'react'
import { TextField } from '@material-ui/core'

const TextFieldUI = ({ placeholder, value, label, onChange, pattern = null, type = 'text' }) => {
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e)}
    />
  )
}

export default TextFieldUI
