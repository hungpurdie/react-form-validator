import React, { ReactNode } from 'react';
import FormField from '../FormField/FormField';
import zxcvbn from 'zxcvbn';

interface IProps {
  label: string;
  fieldId: string;
  placeholder: string;
  required: boolean;
  children?: ReactNode;
  minLength: number;
  threshold: number;
  onStateChanged: (state: string) => void;
}

function PasswordField(props: IProps) {
  const { onStateChanged, minLength, threshold, children, ...restProps } = props;

  const [password, setPassword] = React.useState('');
  const [strength, setStrength] = React.useState(0);
  const passwordLength = password.length;
  const passwordStrong = strength >= minLength;
  const passwordLong = passwordLength > threshold;

  const counterClass = [
    'badge badge-pill',
    passwordLong ? (passwordStrong ? 'badge-success' : 'badge-warning') : 'badge-danger',
  ]
    .join(' ')
    .trim();

  const strengthClass = [
    'strength-meter mt-2',
    passwordLength > 0 ? 'visible' : 'invisible',
  ]
    .join(' ')
    .trim();

  const onFormFieldStateChanged = (data: string) => {
    setPassword(data);
    setStrength(zxcvbn(data).score);

    onStateChanged(data);
  };

  const validatePasswordStrong = (value: string) => {
    if (value.length <= threshold) throw new Error('Password is short');
    if (zxcvbn(value).score < minLength) throw new Error('Password is weak');
  };

  return (
    <>
      <div className="position-relative">
        <FormField
          type="password"
          validator={validatePasswordStrong}
          onStateChanged={onFormFieldStateChanged}
          {...restProps}>
          <span className="d-block form-hint">
            To conform with our Strong Password policy, you are required to use a
            sufficiently strong password. Password must be more than 7 characters.
          </span>
          {children}
          <div className={strengthClass}>
            <div className="strength-meter-fill" data-strength={strength}></div>
          </div>
        </FormField>
      </div>
    </>
  );
}

export default PasswordField;
