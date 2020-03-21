import React from 'react'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const ButtonUI = ({ color, text, onClick }) => {  
  return (
    <Button
      variant="contained"
      color={color}
      onClick={() => onClick()}
      startIcon={color === 'secondary' && <DeleteIcon />}
    >
      {text}
    </Button>
  )
}

export default ButtonUI
