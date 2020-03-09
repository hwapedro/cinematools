import React from "react";
import { Field } from "react-final-form";
import validator from "validator";

export const Input = ({ label, validate }) => {

  const validations = value => {
    if (validate) {
      if (validate.required && !value) {
        return "required";
      }
      if (validate.email && !validator.isEmail(value)) {
        return "uncorrect email";
      }
    }
  };

  return (
    <Field name={label || ""} validate={validations}>
      {({ input, meta }) => (
        <div>
          {label && <label>{label}</label>}
          <input {...input} type="text" placeholder={`write ${label}`} />
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </div>
      )}
    </Field>
  );
};
