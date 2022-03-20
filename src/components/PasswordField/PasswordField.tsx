import React, { ReactNode } from 'react';
import FormField from '../FormField/FormField';
import zxcvbn from 'zxcvbn';
import styled from 'styled-components';
import { ErrorField, Field } from '~/@types/field';

const Wrapper = styled.div``;

const StrengthWrapper = styled.div``;
const StrengthMeter = styled.div``;

interface IProps {
  label: string;
  fieldId: Field;
  placeholder: string;
  required: boolean;
  children?: ReactNode;
  minLength: number;
  threshold: number;
  errorField: ErrorField;
  onFieldChange: (state: string) => void;
}

function PasswordField(props: IProps) {
  const { onFieldChange, minLength, threshold, children, ...restProps } = props;

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

  const handlePasswordChange = (data: string | boolean) => {
    setPassword(data as string);
    setStrength(zxcvbn(data as string).score);

    onFieldChange(data as string);
  };

  const validatePasswordStrong = (value: string | boolean) => {
    if ((value as string).length <= threshold) throw new Error('Password is short');
    if (zxcvbn(value as string).score < minLength) throw new Error('Password is weak');
  };

  return (
    <>
      <Wrapper>
        <FormField
          type="password"
          validator={validatePasswordStrong}
          onFieldChange={handlePasswordChange}
          {...restProps}>
          {children}
          <StrengthWrapper className={strengthClass}>
            <StrengthMeter
              className="strength-meter-fill"
              data-strength={strength}></StrengthMeter>
          </StrengthWrapper>
        </FormField>
      </Wrapper>
    </>
  );
}

export default PasswordField;
