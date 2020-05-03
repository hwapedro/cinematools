import React from 'react'
import { Field } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { setError } from '../../../sagas/auth/actions'

import './input.css'

export const Input = ({ label, disabled }) => {
  const dispatch = useDispatch()

  return (
    <Field name={label || ''}>
      {({ input, meta }) => {
        const error = meta.error && meta.touched
        return (
          <div>
            <div className="input-container">
              <input
                {...input}
                onChange={(e) => {
                  input.onChange(e)
                  dispatch(setError(false))
                }}
                disabled={disabled}
                className={error ? 'input-error' : 'input'}
                type="text"
                placeholder={`${label}`}
              />
              <div className="error">{error && <span>{meta.error}</span>}</div>
            </div>
          </div>
        )
      }}
    </Field>
  )
}
