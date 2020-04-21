import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { SelectItem } from './selectItem'

export const SelectColumn = ({ items, droppableId }) => (
  <div>
    <span>column </span>
    {console.log(droppableId)}
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
          {items.map((el, index) => (
            <SelectItem key={el._id} id={el._id} index={index} items={el} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
)
