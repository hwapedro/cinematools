import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { smartActions } from 'store/smart'
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import { green, red } from '@material-ui/core/colors'

import { SmartConstructor } from 'components/shared/smart/smartConstructor'
import { HallPreview } from 'components/custom/customHall/hallPreview'
import { MultiSelectList } from 'components/custom/customSelect/selectList'
import models from 'models'

import './styles.css'

export const GeneralItem = ({ item, model, hallCells, isMultiSelect = false, ...props }) => {
  const dispatch = useDispatch()
  const history = useHistory()

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
            <span className={`field-value field-value-${model}`}>{item[field] && item[field].toString()}</span>
          </div>
        )
      case 'textarea':
        return (
          <div className={`textarea ${field}-${model}`} key={field}>
            <span className={`textarea-title textarea-title-${model}`}>{fieldInModel.name}</span>
            <span className={`textarea-value textarea-value-${model}`}>{item[field] && item[field].toString()}</span>
          </div>
        )
      case 'number':
        return (
          <div className={`number ${field}-${model}`} key={field}>
            <span className={`number-title number-title-${model}`}>{fieldInModel.name}</span>
            <span className={`number-value number-value-${model}`}>{item[field] && item[field].toString()}</span>
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
          <div className={`date ${field}-${model}`} key={field}>
            <span className={`date-title date-title-${model}`}>{fieldInModel.name}</span>
            <span className={`date-value date-value-${model}`}>{item[field] && item[field].toString()}</span>
          </div>
        )
      case 'hall':
        return <HallPreview hallCells={hallCells} structure={item.structure} isMultiSelect={isMultiSelect} />
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
    <div {...props} className={`container-item container-item-${model}`}>
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
        {!isMultiSelect && (
          <>
            {model === 'cinemas' && (
              <IconButton style={{ fontSize: '18px' }} type="button" color="primary" text="edit" onClick={() => history.push(`/cinema/${item._id}/`)}>
                <AddIcon /> showtimes
              </IconButton>
            )}
            <IconButton type="button" color="primary" text="edit" onClick={() => setEditMode(true)}>
              <CreateIcon />
            </IconButton>
            <IconButton type="button" color="secondary" onClick={() => dispatch(smartActions[model].delete(item._id))}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </div>
    </div>
  ) : (
    <>
      <div className={`constructor-wrapper constructor-wrapper-${model}`}>
        <SmartConstructor model={model} id={item._id} value={item} setEditMode={setEditMode} />
      </div>
      <div className="white-ground"></div>
    </>
  )

  return content
}
