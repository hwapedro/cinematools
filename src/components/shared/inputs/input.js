import React from 'react'
import { TextField } from '@material-ui/core'

const TextFieldUI = props => {
  const { placeholder, value, label, onChange, pattern = null } = props
  return (
    <TextField id="outlined-basic" label={label} variant="outlined" placeholder={placeholder} value={value} onChange={e => onChange(e)} {...props} />
  )
}

export default TextFieldUI
