import React from 'react'
import { Form } from 'react-final-form'
import * as yup from 'yup'
import { setIn } from 'final-form'
import { useDispatch, useSelector } from 'react-redux'

import { getLoading } from '../../../sagas/auth/selectors'
import { Input } from '../../shared/inputs'
import { login } from '../../../sagas/auth/actions'

import './auth.css'

const onSubmit = async (values, dispatch) => {
  const { email, password } = values
  await dispatch(login(email, password))
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
  const loading = useSelector(getLoading)

  return (
    <div className="container-auth">
      <div>
        <h1 className="title">icinematools</h1>
      </div>
      <div className="form-container">
        <Form
          onSubmit={values => onSubmit(values, dispatch)}
          validate={values => validate({ values, schema })}
          render={({ handleSubmit, submitting, values }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Input disabled={loading} label="email" name="email" />
                <Input disabled={loading} label="password" name="password" />

                <div className="button-container">
                  <button className="button" type="submit" disabled={loading}>
                    sign in
                  </button>
                </div>
              </form>
            )
          }}
        />
      </div>
    </div>
  )
}
