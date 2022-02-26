import validator from "validator";
import React from "react";
import FormField from "../FormField/FormField";

interface IProps {
  label: string;
  fieldId: string;
  placeholder: string;
  required: boolean;
  children?: Element;
  onStateChanged: (state: string) => void;
}

function EmailField({ ...rest }: IProps) {
  const validateEmail = (value: string) => {
    if (!validator.isEmail(value)) {
      throw new Error("Email is invalid");
    }
  };

  return <FormField validator={validateEmail} type="text" {...rest} />;
}

export default EmailField;
