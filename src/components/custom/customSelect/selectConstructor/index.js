import React, { useState } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { DragDropContext } from 'react-beautiful-dnd'
import './smartMultiselectEditor.css'
import { SelectColumn } from '../selectColumn'
import { MultiSelectItem } from '../selectItem'
import { useItemMultiSelectFetcher } from './hooks/useItemMultiSelectFetcher'

const SmartMultiselectEditor = ({ items, model }) => {
  const allItems = useItemMultiSelectFetcher(model)

  return (
    <>
      <DragDropContext>
        <SelectColumn items={allItems} droppableId="column-1" />
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
        <MultiSelectItem extractor={extractor} itemsModelName={itemsModelName} multiSelect={multiSelect}/>
        <Fab color="primary" aria-label="add" onClick={() => setIsEditing(true)}>
          <AddIcon />
        </Fab>
      </div>

      {isEditing && <SmartMultiselectEditor items={multiSelect} model={itemsModel} />}
    </div>
  )
}
