import React from "react";
import EmailField from "../EmailField/EmailField";
import FormField from "../FormField/FormField";
import PasswordField from "../PasswordField/PasswordField";

function JoinForm() {
  const [fullName, setFullName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const formValidated = fullName && email && password;

  const validateFullName = (value: string) => {
    const regex = /^[a-z]{2,}(\s[a-z]{2,})+$/i;
    if (!regex.test(value)) throw new Error("FullName is invalid");
  };

  const fullNameChanged = (name: string) => {
    setFullName(name);
  };
  const emailChanged = (email: string) => {
    setEmail(email);
  };
  const passwordChanged = (password: string) => {
    setPassword(password);
  };
  return (
    <div className="form-container d-table-cell position-relative align-middle">
      <form action="/" method="POST" noValidate>
        <div className="d-flex flex-row justify-content-between align-items-center px-3 mb-5">
          <legend className="form-label mb-0">Login Form</legend>
          {formValidated && (
            <button type="button" className="btn btn-primary text-uppercase px-3 py-2">
              Join
            </button>
          )}
        </div>

        <div className="py-5 border-gray border-top border-bottom">
          <FormField
            type="text"
            fieldId="fullName"
            label="FullName"
            placeholder="Enter FullName"
            validator={validateFullName}
            onStateChanged={fullNameChanged}
            required={true}
          />

          <EmailField
            fieldId="email"
            label="Email"
            placeholder="Enter Email Address"
            onStateChanged={emailChanged}
            required
          />
          <PasswordField
            fieldId="password"
            label="Password"
            placeholder="Enter Password"
            onStateChanged={passwordChanged}
            threshold={7}
            minLength={3}
            required
          />
        </div>
      </form>
    </div>
  );
}
export default JoinForm;
