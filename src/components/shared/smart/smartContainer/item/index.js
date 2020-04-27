import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { smartActions } from 'store/smart'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import { green, red } from '@material-ui/core/colors'

import { SmartConstructor } from 'components/shared/smart/smartConstructor'
import { HallItem } from 'components/custom/customHall/hallItem'
import { MultiSelectList } from 'components/custom/customSelect/selectList'
import Button from 'components/shared/buttons'
import models from 'models'

import './styles.css'

export const GeneralItem = ({ item, model }) => {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)

  const fieldValues = Object.keys(item).map((field, index) => {
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
          <div className={`field ${field}-${model}`} key={field}>
            <span className={`field-title field-title-${model}`}>{fieldInModel.name}</span>
            <span className={`field-value field-value-${model}`}>{item[field].toString()}</span>
          </div>
        )
      case 'textarea':
        return (
          <div className={`textarea ${field}-${model}`} key={field}>
            <span className={`textarea-title textarea-title-${model}`}>{fieldInModel.name}</span>
            <span className={`textarea-value textarea-value-${model}`}>{item[field].toString()}</span>
          </div>
        )
      case 'number':
        return (
          <div className={`number ${field}-${model}`} key={field}>
            <span className={`number-title number-title-${model}`}>{fieldInModel.name}</span>
            <span className={`number-value number-value-${model}`}>{item[field].toString()}</span>
          </div>
        )
      case 'checkbox':
        return (
          <div className={`checkbox ${field}-${model}`} key={field}>
            <span className={`checkbox-title checkbox-title-${model}`}>{fieldInModel.name}</span>
            <span className={`checkbox-value checkbox-value-${model}`}>
              {item[field] ? <CheckIcon style={{ color: green[500] }} /> : <CloseIcon style={{ color: red[500] }} />}
            </span>
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
      default:
        return
    }
  })

  const multiField = models[model].find((modelItem, index) => {
    if (modelItem.type === 'multi') {
      return modelItem
    }
  })

  const imageField = models[model].find((modelItem, index) => {
    if (modelItem.type === 'image') {
      return modelItem
    }
  })

  const content = !editMode ? (
    <div className={`container-item container-item-${model}`}>
      {imageField && (
        <div className={`image ${imageField.type}-${model}`} key={imageField.type}>
          <div className={`image-container image-container-${model}`} key={imageField.type}>
            <img className={`image-value image-value-${model}`} src={item[imageField.type]} alt={`${imageField.name}-${model}`} />
          </div>
        </div>
      )}
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
    <>
      <div className={`constructor-wrapper constructor-wrapper-${model}`}>
        <SmartConstructor model={model} id={item._id} value={item} setEditMode={setEditMode} />
      </div>
      <div className='white-ground'></div>
    </>
  )

  return content
}
