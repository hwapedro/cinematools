import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { RHFInput as InputWrapper } from 'react-hook-form-input'
import { Checkbox } from '@material-ui/core/'
import { DropzoneArea } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core/styles'
import { KeyboardDatePicker } from '@material-ui/pickers'
import PerfectScrollbar from 'react-perfect-scrollbar'
import * as yup from 'yup'

import Button from '../../../shared/buttons'
import TextField from '../../../shared/inputs/input'
import { CustomHall } from 'components/custom/customHall/hallConstructor'
import { smartActions } from 'store/smart/'
import { CustomMultiselect } from 'components/custom/customSelect/selectConstructor'
import models from 'models'
import { checkMultiSelectModel } from 'utils'

import './style.css'

const useStyles = makeStyles({
  myDropZone: {
    minHeight: '200px',
    backgroundColor: 'white',
    border: '1px solid #C8C8C8',
    '&:hover': {
      border: '1px solid black',
    },
  },
})

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  title: yup.string().required(),
  color: yup.string().required(),
  address: yup.string().required(),
  password: yup.string().required(),
  distributionStartDate: yup.string().required().nullable(),
  distributionEndDate: yup.string().required().nullable(),

  email: yup.string().email().required(),

  description: yup.string().required().min(100),
  bio: yup.string().required().min(100),
  text: yup.string().required().min(100),

  price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .min('100')
    .nullable(),

  duration: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .max('1000')
    .nullable(),
})

export const SmartConstructor = ({ id, value, model, setEditMode, resetPage }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  let defaultValueMultiSelect = {}
  const isMultiSelectModel = checkMultiSelectModel(model)

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

  const { register, handleSubmit, control, setValue, errors } = useForm({ defaultValues, validationSchema })
  console.log('@@12312', errors)

  const onSubmit = (data) => {
    if (model === 'halls') {
      data = { ...data, structure }
    }

    if (isMultiSelectModel) {
      for (let prop in multiSelect) {
        multiSelect[prop] = multiSelect[prop].map((el) => el._id)
      }
      data = { ...data, ...multiSelect }
    }

    if (value) {
      dispatch(smartActions[model].change(id, data))
    } else {
      dispatch(smartActions[model].add(data))
    }
    document.getElementsByTagName('body')[0].style.overflow = 'scroll'
    setEditMode(false)
    if (resetPage) {
      resetPage()
    }
  }

  const content = modelItem.map((el) => {
    switch (el.type) {
      case 'field':
        return (
          <div className={`field-input-container field-input-container-${model}`}>
            <TextField
              error={errors[el.name] && errors[el.name].message}
              helperText={errors[el.name] && errors[el.name].message}
              className={`field-input field-input-${model}`}
              type="text"
              key={el.name}
              autoComplete="off"
              name={el.name}
              label={el.name}
              inputRef={register}
            />
          </div>
        )
      case 'textarea':
        return (
          <div className={`textarea-input-container textarea-input-container-${model}`}>
            <TextField
              error={errors[el.name] && errors[el.name].message}
              helperText={errors[el.name] && errors[el.name].message}
              className={`textarea-input textarea-input-${model}`}
              type="text"
              key={el.name}
              autoComplete="off"
              name={el.name}
              label={el.name}
              inputRef={register}
              multiline
              rows={4}
              rowsMax={6}
            />
          </div>
        )
      case 'number':
        return (
          <div className={`number-input-container number-input-container-${model}`}>
            <TextField
              error={errors[el.name] && errors[el.name].message}
              helperText={errors[el.name] && errors[el.name].message}
              className={`number-input number-input-${model}`}
              type="number"
              key={el.name}
              autoComplete="off"
              name={el.name}
              label={el.name}
              inputRef={register}
            />
          </div>
        )
      case 'checkbox':
        return (
          <label key={el.name} htmlFor={el.name}>
            {el.name}
            <InputWrapper id={el.name} as={<Checkbox color="primary" />} type="checkbox" register={register} name={el.name} setValue={setValue} />
          </label>
        )
      case 'date':
        return (
          <div className={`date-input-container date-input-container-${model}`}>
            <Controller
              as={
                <KeyboardDatePicker
                  error={errors[el.name] && errors[el.name].message}
                  helperText={errors[el.name] && errors[el.name].message}
                  fullWidth
                  clearable
                  label={el.name}
                  format="MM/dd/yyyy"
                  views={['year', 'month', 'date']}
                  inputVariant="outlined"
                  margin="normal"
                  disablePast
                  InputAdornmentProps={{ position: 'start' }}
                />
              }
              defaultValue={defaultValues[el.name] ? defaultValues[el.name] : new Date()}
              name={el.name}
              control={control}
            />
          </div>
        )
      case 'hall':
        return <CustomHall key={el.name} structure={structure} setHallStructure={setHallStructure} />
      case 'image':
        return (
          <div className={`image-dropzone-container image-dropzone-container-${model}`}>
            <Controller
              error={'lol'}
              dropzoneClass={classes.myDropZone}
              key={el.name}
              as={DropzoneArea}
              filesLimit={1}
              showPreviewsInDropzone={false}
              showPreviews={true}
              showAlerts={false}
              acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
              initialFiles={value && value[el.name] ? [value[el.name]] : []}
              name={el.name}
              control={control}
            />
          </div>
        )
      case 'multi':
        return (
          <CustomMultiselect
            key={el.name}
            multiSelect={multiSelect}
            setmultiSelect={setmultiSelect}
            itemsModel={el.arrays}
            item={value}
            isChangeMode={!!value}
          />
        )
      default:
        return null
    }
  })

  return (
    <PerfectScrollbar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`constructor-main constructor-main-${model}`}>
          <span className={`constructor-main-title constructor-main-title-${model}`}>
            {value ? 'Change old' : 'Create new'} {model}
          </span>
          <Button color="primary" text={value ? 'change' : 'add'} type="submit" />
          {value && <Button style={{ marginLeft: '10px' }} color="primary" text="back" onClick={() => setEditMode(false)} />}
        </div>

        <div className={`constructor-content constructor-content-${model}`}>{content}</div>
      </form>
    </PerfectScrollbar>
  )
}
