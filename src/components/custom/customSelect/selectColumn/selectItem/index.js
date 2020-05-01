import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { GeneralItem } from '../../../../shared/smart/smartContainer/item'

import './style.css'

export const SelectItem = ({ id, item, index, itemsModelName }) => {
  return (
    <Draggable draggableId={id} index={index + 1}>
      {(provided, snapshot) => (
        <div
          className="multiselect-item-container"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          style={{ ...provided.draggableProps.style, margin: '0 0 10px' }}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <GeneralItem style={{ margin: '0' }} item={item} key={item._id} model={itemsModelName} isMultiSelect />
        </div>
      )}
    </Draggable>
  )
}
