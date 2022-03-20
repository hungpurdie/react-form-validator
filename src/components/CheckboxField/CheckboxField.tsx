import React from 'react';
import { ErrorField, FieldName } from '~/@types/field';
import FormField from '../FormField/FormField';

interface IProps {
  label: string;
  fieldId: FieldName;
  required: boolean;
  termsOfService: boolean;
  children?: Element;
  errorField: ErrorField;
  onFieldChange: (state: string) => void;
  validator: (state: string) => void;
}
function CheckboxField({ ...rest }: IProps) {
  const validateCheckbox = (value: string) => {
    if (!value as boolean) {
      throw new Error('Terms must be accepted');
    }
  };
  return <FormField {...rest} validator={validateCheckbox} type="checkbox" />;
}
export default CheckboxField;
