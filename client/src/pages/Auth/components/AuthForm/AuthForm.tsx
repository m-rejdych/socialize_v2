import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardContent,
  CardActions,
  Button,
  makeStyles,
  Typography,
  Box,
} from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';

import FormInput from '../FormInput';
import ROUTES from '../../../../shared/constants/routes';
import RootState from '../../../../interfaces/store';
import { register, login } from '../../../../store/actions/authActions';
import { setUserError } from '../../../../store/actions/userActions';

const useStyles = makeStyles((theme) => ({
  paddingTopZero: {
    paddingTop: 0,
  },
  link: {
    cursor: 'pointer',
    fontWeight: 700,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

interface Field {
  name: string;
  type: string;
  label: string;
  validate: (value: string) => string | undefined;
}

interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues extends LoginValues {
  firstName: string;
  lastName: string;
}

const AuthForm: React.FC = () => {
  const classes = useStyles();
  const userError = useSelector((state: RootState) => state.user.error);
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const isLogin = pathname === ROUTES.LOGIN;

  const initialValues = isLogin
    ? {
        email: '',
        password: '',
      }
    : {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      };

  const loginFields: [Field, Field] = [
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

  const registerFields: [Field, Field, Field, Field] = [
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

  const handleSwitchRoute = (): void => {
    history.push(isLogin ? ROUTES.REGISTER : ROUTES.LOGIN);
    if (userError) dispatch(setUserError(null));
  };

  const handleSubmit = (values: LoginValues | RegisterValues): void => {
    dispatch(
      isLogin
        ? login(values as LoginValues)
        : register(values as RegisterValues),
    );
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      enableReinitialize
    >
      {({ isValid, dirty }) => (
        <Form>
          <CardContent>
            {(isLogin ? loginFields : registerFields).map((field) => (
              <FormInput key={field.name} {...field} />
            ))}
          </CardContent>
          <CardActions className={classes.paddingTopZero}>
            <Box flexGrow={1}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={!dirty || !isValid}
              >
                {isLogin ? 'LOG IN' : 'REGISTER'}
              </Button>
            </Box>
            <Typography variant="caption">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </Typography>
            <Typography
              variant="caption"
              color="secondary"
              className={classes.link}
              onClick={handleSwitchRoute}
            >
              {isLogin ? 'REGISTER' : 'LOG IN'}
            </Typography>
          </CardActions>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
