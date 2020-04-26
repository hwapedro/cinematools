import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { smartActions } from 'store/smart'
import { SmartConstructor } from 'components/shared/smart/smartConstructor'
import { HallItem } from 'components/custom/customHall/hallItem'
import { MultiSelectList } from 'components/custom/customSelect/selectList'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'

import Button from 'components/shared/buttons'
import models from 'models'

import './styles.css'

export const GeneralItem = ({ item, model }) => {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)

  const fieldValues = Object.keys(item).map((field, index) => {
    console.log(field)

    const fieldInModel = models[model].find((modelItem, index) => {
      if (modelItem.name === field) {
        return modelItem
      }
    })

    if (!fieldInModel) {
      return
    }

    switch (fieldInModel.type) {
      case 'field':
        return (
          <div className={`${field}-${model}`} key={field}>
            <span className={`field-title field-title-${model}`}>{fieldInModel.name}</span>{' '}
            <span className={`field-value field-value-${model}`}>{item[field].toString()}</span>
          </div>
        )
      case 'number':
        return (
          <div className={`${field}-${model}`} key={field}>
            <span className={`number-title number-title-${model}`}>{fieldInModel.name}</span>{' '}
            <span className={`number-value number-value-${model}`}>{item[field].toString()}</span>
          </div>
        )
      case 'checkbox':
        return (
          <div key={field}>
            {fieldInModel.name}: {item[field] ? 'yes' : 'no'}
          </div>
        )
      case 'date':
        return (
          <div key={field}>
            {fieldInModel.name}: {item[field].toString()}
          </div>
        )
      case 'hall':
        return <HallItem structure={item.structure} />
      case 'image':
        return (
          <div key={field}>
            {fieldInModel.name}:<br />
            <img src={item[field]} alt="image" />
          </div>
        )
      default:
        return
    }
  })

  const multiField = models[model].find((modelItem, index) => {
    if (modelItem.type === 'multi') {
      return modelItem
    }
  })

  const content = !editMode ? (
    <div className={`container-item container-item-${model}`}>
      {fieldValues}
      {multiField && <MultiSelectList multiSelectList={multiField.arrays} item={item} />}
      <div className={`buttons-container buttons-container-${model}`}>
        <IconButton type="button" color="primary" text="edit" onClick={() => setEditMode(true)}>
          <CreateIcon />
        </IconButton>

        <IconButton type="button" color="secondary" onClick={() => dispatch(smartActions[model].delete(item._id))}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  ) : (
    <SmartConstructor model={model} id={item._id} value={item} setEditMode={setEditMode} />
  )

  return content
}
