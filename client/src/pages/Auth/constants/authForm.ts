interface Field {
  name: string;
  type: string;
  label: string;
  validate: (value: string) => string | undefined;
}

export const initialLoginValues = {
  email: '',
  password: '',
} as const;

export const initialRegisterValues = {
  ...initialLoginValues,
  firstName: '',
  lastName: '',
} as const;

export const loginFields: [Field, Field] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email address',
    validate: (value: string): string | undefined => {
      let errorMessage;

      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value,
        )
      ) {
        errorMessage = 'Enter a valid email.';
      }

      return errorMessage;
    },
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    validate: (value: string): string | undefined => {
      let errorMessage;

      if (!/^(?=.*\d).{4,8}$/.test(value)) {
        errorMessage =
          'Passoword must be between 4 and 8 characters long and contain letters and numbers!';
      }

      return errorMessage;
    },
  },
];

export const registerFields: [Field, Field, Field, Field] = [
  ...loginFields,
  {
    name: 'firstName',
    type: 'text',
    label: 'First name',
    validate: (value: string): string | undefined => {
      let errorMessage;

      if (value.trim().length === 0) {
        errorMessage = 'First name can not be empty.';
      }

      return errorMessage;
    },
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last name',
    validate: (value: string): string | undefined => {
      let errorMessage;

      if (value.trim().length === 0) {
        errorMessage = 'Last name can not be empty.';
      }

      return errorMessage;
    },
  },
];
