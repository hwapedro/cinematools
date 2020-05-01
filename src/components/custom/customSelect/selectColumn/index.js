import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

import { SelectItem } from './selectItem'
import Button from '../../../shared/buttons'

import './style.css'

export const SelectColumn = ({ items, droppableId, itemsModelName, number, setIsEditing }) => (
  <div className={`multiselect-column `}>
    {number === 1 && <div className={'multiselect-column-title'}> choose from</div>}
    {number === 2 && (
      <div className={'multiselect-column-title'}>
        to <Button color="primary" text="save" onClick={() => setIsEditing(false)} />
      </div>
    )}
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          className={`multiselect-${droppableId}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
          {...provided}
        >
          {items.map((el, index) => (
            <SelectItem key={el._id} id={el._id} index={index} item={el} itemsModelName={itemsModelName} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
)
