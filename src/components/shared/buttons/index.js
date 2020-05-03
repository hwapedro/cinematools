import React from 'react'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const ButtonUI = (props) => {
  const { color, text } = props
  return (
    <Button {...props} variant="contained" color={color} startIcon={color === 'secondary' && <DeleteIcon />} {...props}>
      {text}
    </Button>
  )
}

export default ButtonUI
