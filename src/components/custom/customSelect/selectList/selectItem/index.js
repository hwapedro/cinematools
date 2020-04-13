import React from 'react'

export const MultiSelectItem = ({ extractor, item }) => {
  return (
    <div>
      <div key={extractor.key(item)}>{extractor.name(item)}</div>
    </div>
  )
}
