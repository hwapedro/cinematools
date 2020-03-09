import React from "react";
import { Form } from "react-final-form";

import { Input } from "../../shared/inputs";

const onSubmit = values => {
  console.log(values);
};

export const Auth = () => {
  return (
    <Form
      onSubmit={onSubmit}
      validateOnBlur
      render={({ handleSubmit, submitting, values }) => (
        <form onSubmit={handleSubmit}>
          <Input disabled={submitting} label="login" validate={{ required: true }} />
          <Input disabled={submitting} label="password" validate={{ required: true, email: true }} />

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
