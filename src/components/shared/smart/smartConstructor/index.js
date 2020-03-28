import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { RHFInput as InputWrapper } from 'react-hook-form-input'
import { Checkbox } from '@material-ui/core/'

import Button from '../../../shared/buttons'
import TextField from '../../../shared/inputs/input'
import { smartActions } from 'store/smart/'
import models from './models'

export const SmartConstructor = ({ id, value, model, setEditMode }) => {
  const dispatch = useDispatch()

  const modelItem = models[model]
  let defaultValues = {}
  if (value) {
    for (let i = 0; i < modelItem.length; i++) {
      defaultValues[modelItem[i].name] = value[modelItem[i].name]
    }
  }

  const { register, handleSubmit, setValue } = useForm({ defaultValues })

  const onSubmit = data => 
  {
    if (value) {
      dispatch(smartActions[model].change(id, data))
    } else {
      dispatch(smartActions[model].add(data))
    }
    setEditMode(false)
  }

  const content = modelItem.map(el => {
    switch (el.type) {
      case 'field':
        return <TextField key={el.name} autoComplete="off" name={el.name} label={el.name} inputRef={register} />
      case 'checkbox':
        return <InputWrapper key={el.name} as={<Checkbox color="primary" />} type="checkbox" register={register} name={el.name} setValue={setValue} />
      case 'date':
        return <TextField key={el.name} type="date" name={el.name} label={el.name} inputRef={register} />
      default:
        return
    }
  })

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {content}
        <Button color="primary" text={value ? 'change' : 'add'} type="submit" />
      </form>
    </div>
  )
}
