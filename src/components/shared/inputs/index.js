import React from "react";
import { Field } from "react-final-form";

export const Input = ({ label, validate }) => {

  return (
    <Field name={label || ""} >
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
