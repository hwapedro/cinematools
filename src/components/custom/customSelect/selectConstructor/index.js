import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import WarningIcon from '@material-ui/icons/Warning'
import LinearProgress from '@material-ui/core/LinearProgress'

import { MultiSelectItem } from '../selectList/selectItem'
import { SmartMultiselectEditor } from './selectConstructorItem'
import { useItemMultiSelectFetcher } from './hooks/useItemMultiSelectFetcher'
import { getLoading } from 'store/smart/selectors'

import './smartMultiselectEditor.css'
import './style.css'

const Item = ({ item, el, multiSelect, setmultiSelect, isChangeMode, ...props }) => {
  const [isEditing, setIsEditing] = useState(false)
  const allItems = useItemMultiSelectFetcher(el.model)
  const loading = useSelector((state) => getLoading(state, el.model))
  const isNotEmpty = !!allItems.length

  if (loading) {
    return (
      <div style={{ margin: '45px' }}>
        <span>
          <LinearProgress />
        </span>
      </div>
    )
  }

  return (
    <div className="multi-select-container">
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
          <IconButton type="button" >
            <WarningIcon htmlColor="#ffca28"/>
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
