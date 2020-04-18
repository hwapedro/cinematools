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

  let defaultValueMultiSelect = {}
  const isMultiSelectModel = model === 'shops' || model === 'films'
  if (isMultiSelectModel) {
    models[model].map((el) => {
      if (el.type === 'multi') {
        el.arrays.map((el) => {
          defaultValueMultiSelect = value ? { ...defaultValueMultiSelect, [el.name]: value[el.name] } : { ...defaultValueMultiSelect, [el.name]: [] }
        })
      }
    })
  }
  const [multiSelect, setmultiSelect] = useState(defaultValueMultiSelect)

  const [structure, setHallStructure] = useState(value && model === 'halls' ? value.structure : [[0]])

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

  
    if (isMultiSelectModel) {
      for (let prop in multiSelect) {
        multiSelect[prop] =  multiSelect[prop].map(el => el._id) 
      }
      console.log(multiSelect)
      data = { ...data, ...multiSelect }
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
        return <TextField type='text' key={el.name} autoComplete="off" name={el.name} label={el.name} inputRef={register} />
      case 'number':
          return <TextField type='number' key={el.name} autoComplete="off" name={el.name} label={el.name} inputRef={register} />
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
        return <CustomMultiselect key={el.name} multiSelect={multiSelect} setmultiSelect={setmultiSelect} itemsModel={el.arrays} item={value} />
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
