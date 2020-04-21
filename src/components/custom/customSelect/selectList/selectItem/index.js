import React from 'react'
import { useHistory } from 'react-router-dom'

export const MultiSelectItem = ({ extractor, item, modelId }) => {
  const history = useHistory()
  console.log('@', history, modelId)
  return (
    <div>
      <div key={extractor.key(item)}>{extractor.name(item, history, modelId, item._id)}</div>
    </div>
  )
}
