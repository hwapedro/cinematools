import React from 'react'
import { Field } from 'react-final-form'
import './input.css'

export const Input = ({ label, validate }) => {
  return (
    <Field name={label || ''}>
      {({ input, meta }) => {
        const error = meta.error && meta.touched
        return (
          <div>
            {label && (
              <div className="label">
                <label>{label}</label>
              </div>
            )}
            <div className="input-container">
              <input
                {...input}
                className={error ? 'input-error' : 'input'}
                type="text"
                placeholder={`write ${label}`}
              />
              <div className="error">{error && <span>{meta.error}</span>}</div>
            </div>
          </div>
        )
      }}
    </Field>
  )
}
