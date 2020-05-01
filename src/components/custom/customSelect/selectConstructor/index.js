import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import WarningIcon from '@material-ui/icons/Warning'

import { MultiSelectItem } from '../selectList/selectItem'
import { SmartMultiselectEditor } from './selectConstructorItem'
import { useItemMultiSelectFetcher } from './hooks/useItemMultiSelectFetcher'

import './smartMultiselectEditor.css'

const Item = ({ item, el, multiSelect, setmultiSelect, isChangeMode, ...props }) => {
  const [isEditing, setIsEditing] = useState(false)
  const allItems = useItemMultiSelectFetcher(el.model)
  const isNotEmpty = !!allItems.length
  console.log('@@@@', allItems, isNotEmpty)

  return (
    <div>
      {isNotEmpty && (
        <span>
          <IconButton type="button" color="primary" onClick={() => setIsEditing(true)}>
            <AddIcon />
          </IconButton>
          <span>{el.name}</span>
        </span>
      )}
      {!isNotEmpty && (
        <span>
          <IconButton type="button" color="secondary">
            <WarningIcon color="secondary" />
          </IconButton>
          <span>{el.name} is empty, add simple element first</span>
        </span>
      )}
      <div className="multiselect-selected-item-container">
        {multiSelect[el.name].map((one, index) => {
          return (
            <MultiSelectItem
              edit
              extractor={el.extractor}
              itemsModelName={el.name}
              item={one}
              modelId={one._id}
              setmultiSelect={setmultiSelect}
              index={index}
              multiSelect={multiSelect}
            />
          )
        })}
      </div>
      {isEditing && (
        <div>
          {isChangeMode && <div className={`dark-ground`} />}
          <SmartMultiselectEditor
            isChangeMode={isChangeMode}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            itemsModel={el.model}
            setmultiSelect={setmultiSelect}
            itemsModelName={el.name}
            items={multiSelect}
            allItems={allItems}
            {...props}
          />
        </div>
      )}
    </div>
  )
}

export const CustomMultiselect = ({ itemsModel, item, ...props }) => {
  return (
    <>
      {itemsModel.map((el) => (
        <Item item={item} el={el} {...props} />
      ))}
    </>
  )
}
