import React from 'react'
import { TextField } from '@material-ui/core'

const TextFieldUI = props => {
  const { placeholder, name, label, onChange, pattern = null } = props
  return (
    <TextField id="outlined-basic" label={label} variant="outlined" placeholder={placeholder} name={name} {...props}/>
  )
}

export default TextFieldUI
