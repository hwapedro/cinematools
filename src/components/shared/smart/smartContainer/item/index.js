import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { smartActions } from 'store/smart'
import { SmartConstructor } from 'components/shared/smart/smartConstructor'
import { HallItem } from 'components/custom/customHall/hallItem'
import { MultiSelectItem } from 'components/custom/customSelect/selectItem'
import Button from 'components/shared/buttons'
import models from '../../../../../models'

export const GeneralItem = ({ item, model }) => {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)

  const fieldValues = Object.keys(item).map((field) => {
    const fieldInModel = models[model].find((modelItem) => modelItem.name === field)

    if (!fieldInModel) {
      return
    }

    switch (fieldInModel.type) {
      case 'field':
        return (
          <div key={field}>
            {fieldInModel.name}: {item[field].toString()}
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
      case 'multi':
        return <MultiSelectItem extractor={fieldInModel.extractor} itemsModelName={fieldInModel.name} multiSelect={item[fieldInModel.name]} />
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

  const content = !editMode ? (
    <div>
      {fieldValues}
      <div>
        <Button type="button" color="primary" text="edit" onClick={() => setEditMode(true)} />
        <Button type="button" color="secondary" text="delete" onClick={() => dispatch(smartActions[model].delete(item._id))} />
      </div>
    </div>
  ) : (
    <SmartConstructor model={model} id={item._id} value={item} setEditMode={setEditMode} />
  )

  return content
}
