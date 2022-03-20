import React, { ReactNode } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { ErrorField, Field, FieldName } from '~/@types/field';
const Wrapper = styled.div`
  margin-bottom: 0.8rem;
  /* :not(:last-child) {
    margin-bottom: 1rem;
  } */
`;

const FormFeedback = styled(Form.Control.Feedback)`
  display: block;
  &.valid-feedback {
    color: #c00;
    font-size: 0.7rem;
    text-align: right;
    margin: 0;
    margin-bottom: 0.2rem;
    font-weight: bold;
  }
`;
const FormTextBS = styled(Form.Text)`
  display: block;
  margin-top: 0;
`;
const FormControlBS = styled(Form.Control)``;
const FormCheckBS = styled(Form.Check)``;

interface IProps {
  type: string;
  label: string;
  fieldId: FieldName;
  required: boolean;
  placeholder?: string;
  children?: ReactNode;
  errorField: ErrorField;
  onFieldChange: (value: string) => void;
  validator: (value: string) => void;
}

function FormField(props: IProps) {
  const {
    label,
    required,
    validator,
    onFieldChange,
    fieldId,
    placeholder,
    type,
    children,
    errorField,
  } = props;

  const [value, setValue] = React.useState<string | boolean>('');
  const [dirty, setDirty] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<string[]>([]);

  React.useLayoutEffect(() => {
    if (errorField[fieldId]) {
      setErrors([`${label} is required`]);
    } else {
      setErrors([]);
    }
  }, [errorField]);

  const hasErrors = errors.length > 0;

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = type === 'checkbox' ? e.target.checked : e.target.value;

    const requiredMissing =
      dirty && required && typeof value === 'string' ? value.length === 0 : false;

    const errors: string[] = [];

    if (requiredMissing) {
      errors.push(`${label} is required`);
    } else if (typeof validator === 'function') {
      try {
        validator(value as string);
      } catch (e: unknown) {
        if (e instanceof Error) {
          errors.push(e.message);
        }
      }
    }
    onFieldChange(value as string);

    setValue(value);
    setDirty(!dirty || dirty);
    setErrors(errors);
  };

  return (
    <Wrapper>
      <Form.Group controlId={fieldId}>
        {type !== 'checkbox' && <Form.Label>{label}</Form.Label>}
        {type === 'password' && (
          <FormTextBS muted>
            To conform with our Strong Password policy, you are required to use a
            sufficiently strong password. Password must be more than 7 characters.
          </FormTextBS>
        )}
        {hasErrors && <FormFeedback>{errors[0]}</FormFeedback>}
        {children}
        {type === 'checkbox' ? (
          <FormCheckBS
            inline
            className={`${dirty ? (hasErrors ? 'is-invalid' : 'is-valid') : ''}`}
            label={label}
            isInvalid={hasErrors}
            type={type}
            onChange={handleValueChange}
            checked={value}
            required
          />
        ) : (
          <FormControlBS
            className={`${dirty ? (hasErrors ? 'is-invalid' : 'is-valid') : ''}`}
            isInvalid={hasErrors}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleValueChange}
            required
          />
        )}
      </Form.Group>
    </Wrapper>
  );
}
export default FormField;
