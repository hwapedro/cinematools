import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import { SelectColumn } from '../../selectColumn'

import './../smartMultiselectEditor.css'
import './style.css'

export const SmartMultiselectEditor = ({ items, allItems, setmultiSelect, itemsModelName, setIsEditing, isChangeMode }) => {
  const shadowItems = { ...items }
  const shadowItemsCopy = [...shadowItems[itemsModelName]]
 

  let allItemsCopy = [...allItems]
  allItemsCopy = allItemsCopy.filter(el => {
    for(let i = 0; i < shadowItemsCopy.length; i++){
      if(shadowItemsCopy[i]._id === el._id){
        return null
      }
    }
    return el
  })

  const [allItemsWithoutSelected] = useState(allItemsCopy)
  
  return (
    <div className={isChangeMode ? 'multiselect-container-change-mode' : 'multiselect-container'}>
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) {
            return
          }
          if (result.source.droppableId === result.destination.droppableId) {
            if (result.source.droppableId === 'column-1' && result.destination.droppableId === 'column-1') {
              const dragCard = allItemsWithoutSelected[result.source.index - 1]
              allItemsWithoutSelected.splice(result.source.index - 1, 1)
              allItemsWithoutSelected.splice(result.destination.index - 1, 0, dragCard)
            }
            if (result.source.droppableId === 'column-2' && result.destination.droppableId === 'column-2') {
              const shadowItemsArray = [...shadowItems[itemsModelName]]
              const dragCard = shadowItemsArray[result.source.index - 1]
              shadowItemsArray.splice(result.source.index - 1, 1)
              shadowItemsArray.splice(result.destination.index - 1, 0, dragCard)
              setmultiSelect({ ...shadowItems, [itemsModelName]: shadowItemsArray })
            }
          }

          if (result.source.droppableId === 'column-2' && result.destination.droppableId === 'column-1') {
            const shadowItemsArray = [...shadowItems[itemsModelName]]
            const dragCard = shadowItemsArray[result.source.index - 1]
            shadowItemsArray.splice(result.source.index - 1, 1)

            allItemsWithoutSelected.splice(result.destination.index - 1, 0, dragCard)
            setmultiSelect({ ...shadowItems, [itemsModelName]: shadowItemsArray })
          }

          if (result.source.droppableId === 'column-1' && result.destination.droppableId === 'column-2') {
            const dragCard = allItemsWithoutSelected[result.source.index - 1]
            allItemsWithoutSelected.splice(result.source.index - 1, 1)
            const shadowItemsArray = [...shadowItems[itemsModelName]]
            shadowItemsArray.splice(result.destination.index - 1, 0, dragCard)
            setmultiSelect({ ...shadowItems, [itemsModelName]: shadowItemsArray })
          }
        }}
      >
        <SelectColumn items={allItemsWithoutSelected} droppableId="column-1" itemsModelName={itemsModelName} number={1} />
        <SelectColumn items={items[itemsModelName]} droppableId="column-2" itemsModelName={itemsModelName} number={2} setIsEditing={setIsEditing} />
      </DragDropContext>
    </div>
  )
}
