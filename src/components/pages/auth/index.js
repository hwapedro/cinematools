import React from "react";
import { Form } from "react-final-form";
import * as yup from 'yup';
import { setIn } from 'final-form'

import { Input } from "../../shared/inputs";

const onSubmit = values => {
  console.log(values);
};

const schema =
  yup.object().shape({
    email: yup.string().required("это поле обязательно").email("неправильная форма почты")
  });

function mutateObjectHook(values) {
  return values;
}

function validate({ values, schema }) {
  console.log(values)
  let castedValues = {};
  try {
    schema.validateSync(mutateObjectHook(values), {
      abortEarly: false,
      stripUnknown: true,
      context: values,
    });
  } catch (e) {
    console.log(e)
    castedValues = e.inner.reduce(
      (errors, error) => setIn(errors, error.path, error.message),
      {},
    );
  }

  return castedValues;
}
export const Auth = () => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={values => validate({ values, schema })}
      render={({ handleSubmit, submitting, values }) => (
        <form onSubmit={handleSubmit}>
          <Input disabled={submitting} label="email" name='email' />
          <Input disabled={submitting} label="password" name='password' />

          <div className="buttons">
            <button type="submit" disabled={submitting}>
              sign in
            </button>
          </div>
        </form>
      )}
    />
  );
};
