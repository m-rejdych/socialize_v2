import { Formik } from 'formik';
import { CardContent } from '@material-ui/core';

import FormInput from '../FormInput';

interface Field {
  name: string;
  type: string;
  label: string;
  validate: (value: string) => string | undefined;
}

const AuthForm: React.FC = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const fields: Field[] = [
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
    {
      name: 'email',
      type: 'email',
      label: 'First name',
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

  return (
    <Formik onSubmit={() => {}} initialValues={initialValues}>
      {({}) => (
        <CardContent>
          {fields.map((field) => (
            <FormInput key={field.name} {...field} />
          ))}
        </CardContent>
      )}
    </Formik>
  );
};

export default AuthForm;
