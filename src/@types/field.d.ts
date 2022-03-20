export interface ErrorField {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  password: boolean;
  terms: boolean;
}

export type FieldName = 'firstName' | 'lastName' | 'email' | 'password' | 'terms';
