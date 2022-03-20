import validator from 'validator';
import React from 'react';
import FormField from '../FormField/FormField';
import { ErrorField, FieldName } from '~/@types/field';

interface IProps {
  label: string;
  fieldId: FieldName;
  placeholder: string;
  required: boolean;
  children?: Element;
  errorField: ErrorField;
  onFieldChange: (state: string) => void;
}

function EmailField({ ...rest }: IProps) {
  const validateEmail = (value: string) => {
    if (!validator.isEmail(value)) {
      throw new Error('Email must be a valid email');
    }
  };

  return <FormField {...rest} validator={validateEmail} type="text" />;
}

export default EmailField;
