import React, { useState } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { DragDropContext } from 'react-beautiful-dnd'
import './smartMultiselectEditor.css'
import { SelectColumn } from '../selectColumn'
import { MultiSelectItem } from '../selectItem'
import { useItemMultiSelectFetcher } from './hooks/useItemMultiSelectFetcher'
import { differenceWith, isEqual } from 'lodash'

const insert = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index)]

const SmartMultiselectEditor = ({ items, model, setmultiSelect }) => {
  const allItems = useItemMultiSelectFetcher(model)
  let allItemsWithoSelected = differenceWith(allItems, items, isEqual)

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => {
          if (result.source.droppableId === result.destination.droppableId) {
            if (result.source.droppableId === 'column-1' && result.destination.droppableId === 'column-1') {
              const dragCard = allItemsWithoSelected[result.source.index - 1]
              console.log(allItemsWithoSelected, dragCard, result.source.index)
              allItemsWithoSelected.splice(result.source.index - 1, 1)
              allItemsWithoSelected.splice(result.destination.index - 1, 0, dragCard)
            }
            if (result.source.droppableId === 'column-2' && result.destination.droppableId === 'column-2') {
              const dragCard = items[result.source.index - 1]
              const shadowItems = [...items]
              shadowItems.splice(result.source.index - 1, 1)
              shadowItems.splice(result.destination.index - 1, 0, dragCard)
              setmultiSelect(shadowItems)
            }
          }

          if (result.source.droppableId === 'column-2' && result.destination.droppableId === 'column-1') {
            const dragCard = items[result.source.index - 1]
            const shadowItems = [...items]
            shadowItems.splice(result.source.index - 1, 1)
            setmultiSelect(shadowItems)
            allItemsWithoSelected.splice(result.destination.index - 1, 0, dragCard)
          }

          if (result.source.droppableId === 'column-1' && result.destination.droppableId === 'column-2') {
            const dragCard = allItemsWithoSelected[result.source.index - 1]
            allItemsWithoSelected.splice(result.source.index - 1, 1)
            setmultiSelect(insert(items, result.destination.index - 1, dragCard))
          }
          console.log(result)
        }}
      >
        <SelectColumn items={allItemsWithoSelected} droppableId="column-1" />
        <SelectColumn items={items} droppableId="column-2" />
      </DragDropContext>
    </>
  )
}

export const CustomMultiselect = ({ extractor, itemsModelName, itemsModel, multiSelect, setmultiSelect, ...props }) => {
  const [isEditing, setIsEditing] = useState(false)

  const items = multiSelect.map((item) => {
    return <div key={extractor.key(item)}>{extractor.name(item)}</div>
  })

  return (
    <div {...props}>
      <div>
        <MultiSelectItem extractor={extractor} itemsModelName={itemsModelName} multiSelect={multiSelect} />
        <Fab color="primary" aria-label="add" onClick={() => setIsEditing(true)}>
          <AddIcon />
        </Fab>
      </div>

      {isEditing && <SmartMultiselectEditor items={multiSelect} model={itemsModel} setmultiSelect={setmultiSelect} />}
    </div>
  )
}
