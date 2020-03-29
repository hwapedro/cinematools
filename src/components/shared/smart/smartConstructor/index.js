import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { RHFInput as InputWrapper } from 'react-hook-form-input'
import { Checkbox } from '@material-ui/core/'
import { DropzoneArea } from 'material-ui-dropzone'

import Button from 'components/shared/buttons'
import TextField from 'components/shared/inputs/input'
import { smartActions } from 'store/smart'
import { CustomHall } from 'components/custom/customHall/'
import models from 'models'
import { SmartMultiselect } from 'components/shared/smart/smartMultiselect'

export const SmartConstructor = ({ id, value, model, setEditMode, resetPage }) => {
  const dispatch = useDispatch()

  const modelItem = models[model]
  let defaultValues = {}
  if (value) {
    for (let i = 0; i < modelItem.length; i++) {
      defaultValues[modelItem[i].name] = value[modelItem[i].name]
    }
  }

  const { register, handleSubmit, control, setValue } = useForm({ defaultValues })

  const onSubmit = data => {
    console.log('Submitting', data);
    if (value) {
      dispatch(smartActions[model].change(id, data))
    } else {
      dispatch(smartActions[model].add(data))
    }
    setEditMode(false)
    if (resetPage) {
      resetPage();
    }
  }

  const content = modelItem.map(el => {
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
        return <CustomHall key={el.name} />
      case 'image':
        return <Controller
          key={el.name}
          as={DropzoneArea}
          filesLimit={1}
          showAlerts={false}
          initialFiles={(value && value[el.name]) ? [value[el.name]] : []}
          acceptedFiles={['image/*']}
          name={el.name}
          control={control}
        />
      case 'refsArray':
        return <SmartMultiselect
          key={el.name}
          keyInfo={el}
          model={model}
          itemsModel={el.model}
        />
        break;
      default:
        return
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
