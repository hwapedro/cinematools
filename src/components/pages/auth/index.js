import React from 'react'
import { Form } from 'react-final-form'
import * as yup from 'yup'
import { setIn } from 'final-form'
import { useDispatch } from 'react-redux'

import './auth.css'

import { Input } from '../../shared/inputs'
import { login } from '../../../sagas/auth/actions'

const onSubmit = (values, dispatch) => {
  dispatch(login(values))
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('required')
    .email('email format is incorrect'),
  password: yup.string().required('required')
})

function mutateObjectHook(values) {
  return values
}

function validate({ values, schema }) {
  let castedValues = {}
  try {
    schema.validateSync(mutateObjectHook(values), {
      abortEarly: false,
      stripUnknown: true,
      context: values
    })
  } catch (e) {
    castedValues = e.inner.reduce((errors, error) => setIn(errors, error.path, error.message), {})
  }

  return castedValues
}
export const Auth = () => {
  const dispatch = useDispatch()

  return (
    <div className="container">
      <div>
        <h1 className="title">icinematools</h1>
      </div>
      <div className="form-container">
        <Form
          onSubmit={values => onSubmit(values, dispatch)}
          validate={values => validate({ values, schema })}
          render={({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <Input disabled={submitting} label="email" name="email" />
              <Input disabled={submitting} label="password" name="password" />

              <div className="button-container">
                <button className="button" type="submit" disabled={submitting}>
                  sign in
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  )
}
