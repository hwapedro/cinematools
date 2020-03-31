import React, { useState } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import models from 'models';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './smartMultiselectEditor.css';

const SmartMultiselectEditor = ({ }) => {
  return (
    <div className="smart-muliselect-editor">
      <div className="sme-col sme-col-left">
        <div className="header">
          All items
        </div>
        <div className="content">

        </div>
      </div>
      <div className="sme-col sme-col-right">
        <div className="header">
          Selected items
        </div>
        <div className="content">

        </div>
      </div>
    </div>
  );
}

export const SmartMultiselect = ({ keyInfo, model, itemsModel, itemValues, updateItems, ...props }) => {
  const [items, setItems] = useState(itemValues && itemValues.length ? itemValues : []);
  const [isEditing, setIsEditing] = useState(false);

  const modelInfo = models[model];

  const renderedItems = items.map(item => {
    return (
      <div key={keyInfo.extractor.key(item)}>
        {keyInfo.extractor.name(item)}
      </div>
    )
  });

  return (
    <div {...props}>
      <div>
        <span> {keyInfo.name}: </span>
        <Fab color="primary" aria-label="add" onClick={() => setIsEditing(true)}>
          <AddIcon />
        </Fab>
      </div>
      {renderedItems}
      {isEditing && <SmartMultiselectEditor />}
    </div>
  )
}