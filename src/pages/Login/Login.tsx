import React from 'react';
import EmailField from '../../components/EmailField/EmailField';
import FormField from '../../components/FormField/FormField';
import PasswordField from '../../components/PasswordField/PasswordField';
import styled from 'styled-components';
import { Button, Form } from 'react-bootstrap';
import CheckboxField from '~/components/CheckboxField/CheckboxField';
import { ErrorField } from '~/@types/field';

const Wrapper = styled.div``;
const FormBS = styled(Form)``;
const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
const WrapperField = styled.div``;
const WrapperButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-top: 1rem;
`;
const ButtonBS = styled(Button)``;

function Login() {
  const initialErrorField: ErrorField = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    terms: false,
  };

  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [termsOfService, setTermsOfService] = React.useState<boolean>(false);
  const [errorField, setErrorField] = React.useState<ErrorField>(initialErrorField);

  const validateFullName = (value: string) => {
    const regex = /^[a-z]{2,}(\s[a-z]{2,})+$/i;
    if (!regex.test(value)) throw new Error('First name is invalid');
  };
  const validateCheckbox = (value: string) => {
    if (!value as boolean) throw new Error('Terms must be accepted');
  };

  const handleFirstNameChange = (firstName: string) => {
    setFirstName(firstName);
  };
  const lastNameChanged = (lastName: string) => {
    setLastName(lastName);
  };
  const emailChanged = (email: string) => {
    setEmail(email);
  };
  const passwordChanged = (password: string) => {
    setPassword(password);
  };
  const checkboxChanged = (value: string) => {
    setTermsOfService(value as unknown as boolean);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !termsOfService) {
      setErrorField({
        firstName: !firstName,
        lastName: !lastName,
        email: !email,
        password: !password,
        terms: !termsOfService,
      });
    } else if (firstName && lastName && email && password && termsOfService) {
      const values = {
        firstName,
        lastName,
        email,
        password,
        termsOfService,
      };
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
      }, 400);
    }
  };

  return (
    <Wrapper>
      <Title>Login Form</Title>
      <FormBS noValidate onSubmit={handleOnSubmit}>
        <WrapperField>
          <FormField
            type="text"
            fieldId="firstName"
            label="First Name"
            placeholder="Enter first name"
            validator={validateFullName}
            onFieldChange={handleFirstNameChange}
            required={true}
            errorField={errorField}
          />
          <FormField
            type="text"
            fieldId="lastName"
            label="LastName"
            placeholder="Enter last name"
            validator={validateFullName}
            onFieldChange={lastNameChanged}
            required={true}
            errorField={errorField}
          />
          <EmailField
            fieldId="email"
            label="Email"
            placeholder="Enter email address"
            onFieldChange={emailChanged}
            errorField={errorField}
            required
          />
          <PasswordField
            fieldId="password"
            label="Password"
            placeholder="Enter password"
            errorField={errorField}
            onFieldChange={passwordChanged}
            threshold={7}
            minLength={3}
            required
          />
          <CheckboxField
            fieldId="terms"
            label="I agree with terms and conditions"
            onFieldChange={checkboxChanged}
            errorField={errorField}
            validator={validateCheckbox}
            termsOfService={termsOfService}
            required
          />
        </WrapperField>
        <WrapperButton>
          <ButtonBS type="submit" className="btn btn-primary">
            Login
          </ButtonBS>
        </WrapperButton>
      </FormBS>
    </Wrapper>
  );
}
export default Login;
