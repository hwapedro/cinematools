import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export const SelectItem = ({ id, items, index }) => {
  return (
    <Draggable draggableId={id} index={index + 1}>
      {(provided, snapshot) => (
        <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
          <div>{items.name}</div>
        </div>
      )}
    </Draggable>
  )
}
