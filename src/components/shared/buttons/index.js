import React from 'react'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const ButtonUI = (props) => {  
  const { color, text, onClick , type} = props
  return (
    <Button
      variant="contained"
      color={color}
      type
      startIcon={color === 'secondary' && <DeleteIcon />}
      {...props}
    >
      {text}
    </Button>
  )
}

export default ButtonUI
