import React from 'react'

export const MultiSelectItem = ({ extractor, itemsModelName, multiSelect }) => {
  const items = multiSelect.map((item) => {
    return <div key={extractor.key(item)}>{extractor.name(item)}</div>
  })

  return (
    <div>
      <span> {itemsModelName}: </span>
      {items}
    </div>
  )
}
