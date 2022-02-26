import React, { ReactNode } from "react";

interface IProps {
  onStateChanged: (state: string) => void;
  validator: (value: string) => void;
  type: string;
  label: string;
  fieldId: string;
  placeholder: string;
  required: boolean;
  children?: ReactNode;
}

function FormField(props: IProps) {
  const { label, required, validator, onStateChanged, fieldId, placeholder, type, children } =
    props;

  const [value, setValue] = React.useState<string>("");
  const [dirty, setDirty] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<string[]>([]);

  const hasErrors = errors.length > 0;
  const controlClass = ["form-control", dirty ? (hasErrors ? "is-invalid" : "is-valid") : ""]
    .join(" ")
    .trim();

  const onFieldChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const isEmpty = value.length === 0;
    const requiredMissing = dirty && required && isEmpty;

    let errors: string[] = [];

    if (requiredMissing) {
      errors = [...errors, `${label} is required`];
    } else if (typeof validator === "function") {
      try {
        validator(value);
      } catch (e: unknown) {
        if (e instanceof Error) {
          errors = [...errors, e.message];
        }
      }
    }
    onStateChanged(value);

    setDirty(!dirty || dirty);
    setErrors(errors);
    setValue(value);
  };

  return (
    <>
      <div className="form-group px-3 pb-2">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <label htmlFor={fieldId} className="control-label mb-2">
            {label}
          </label>
          {hasErrors && (
            <div className="error form-hint font-weight-bold text-right m-0 mb-2">{errors[0]}</div>
          )}
        </div>
        {children}
        <input
          type={type}
          className={controlClass}
          id={fieldId}
          placeholder={placeholder}
          value={value}
          onChange={onFieldChanged}
          required
        />
      </div>
    </>
  );
}
export default FormField;
