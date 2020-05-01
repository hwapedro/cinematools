import React from 'react'
import { useHistory } from 'react-router-dom'
import ClearIcon from '@material-ui/icons/Clear'

import './style.css'

export const MultiSelectItem = ({ extractor, item, modelId, edit = false, setmultiSelect, index, itemsModelName}) => {
  const history = useHistory()
  console.log('@', extractor.name(item))

  const deleteItem = () => {
    setmultiSelect((prev) => {
      const copy = {...prev}
      copy[itemsModelName].splice(index, 1)
      return copy
    })
  }

  return (
    <span className="multiselect-selected-item" key={extractor.key(item)}>
      {extractor.name(item, history, modelId, item._id)}
      {edit && (
        <ClearIcon style={{ height: '19px', width: '19px', verticalAlign: 'middle', cursor: 'pointer' }} color="white" onClick={() => deleteItem()} />
      )}
    </span>
  )
}
