import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { RHFInput as InputWrapper } from 'react-hook-form-input'
import { Checkbox } from '@material-ui/core/'
import { DropzoneArea } from 'material-ui-dropzone'

import Button from '../../../shared/buttons'
import TextField from '../../../shared/inputs/input'
import { CustomHall } from 'components/custom/customHall/hallConstructor'
import { smartActions } from 'store/smart/'
import { CustomMultiselect } from 'components/custom/customSelect/selectConstructor'
import models from 'models'

export const SmartConstructor = ({ id, value, model, setEditMode, resetPage }) => {
  const dispatch = useDispatch()
  const isMultiSelectModel = model === 'shops' || model === 'films'
  const [structure, setHallStructure] = useState(value && model === 'halls' ? value.structure : [[0]])
  const [multiSelect, setmultiSelect] = useState(value && isMultiSelectModel ? value.items : [])

  const modelItem = models[model]
  let defaultValues = {}

  if (value) {
    for (let i = 0; i < modelItem.length; i++) {
      defaultValues[modelItem[i].name] = value[modelItem[i].name]
    }
  }

  const { register, handleSubmit, control, setValue } = useForm({ defaultValues })

  const onSubmit = (data) => {
    if (model === 'halls') {
      data = { ...data, structure }
    }
    console.log(isMultiSelectModel, multiSelect)
    if (isMultiSelectModel) {
      data = { ...data, multiSelect }
    }

    if (value) {
      dispatch(smartActions[model].change(id, data))
    } else {
      dispatch(smartActions[model].add(data))
    }
    setEditMode(false)
    if (resetPage) {
      resetPage()
    }
  }

  const content = modelItem.map((el) => {
    switch (el.type) {
      case 'field':
        return <TextField key={el.name} autoComplete="off" name={el.name} label={el.name} inputRef={register} />
      case 'checkbox':
        return (
          <label key={el.name} htmlFor={el.name}>
            {el.name}
            <InputWrapper id={el.name} as={<Checkbox color="primary" />} type="checkbox" register={register} name={el.name} setValue={setValue} />
          </label>
        )
      case 'date':
        return <TextField key={el.name} type="date" name={el.name} label={el.name} inputRef={register} />
      case 'hall':
        return <CustomHall key={el.name} structure={structure} setHallStructure={setHallStructure} />
      case 'image':
        return (
          <Controller
            key={el.name}
            as={DropzoneArea}
            filesLimit={1}
            showAlerts={false}
            initialFiles={value && value[el.name] ? [value[el.name]] : []}
            acceptedFiles={['image/*']}
            name={el.name}
            control={control}
          />
        )
      case 'multi':
        return (
          <CustomMultiselect
            key={el.name}
            extractor={el.extractor}
            multiSelect={multiSelect}
            setmultiSelect={setmultiSelect}
            itemsModelName={el.name}
            itemsModel={el.model}
          />
        )
      default:
        return null
    }
  })

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {content}
        <hr />
        <Button color="primary" text={value ? 'change' : 'add'} type="submit" />
      </form>
    </div>
  )
}
