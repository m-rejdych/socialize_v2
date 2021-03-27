import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardContent,
  CardActions,
  Button,
  makeStyles,
  Typography,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';

import FormInput from '../FormInput';
import ROUTES from '../../../../shared/constants/routes';
import RootState from '../../../../interfaces/store';
import { register, login } from '../../../../store/actions/authActions';
import { setUserError } from '../../../../store/actions/userActions';
import {
  initialLoginValues,
  initialRegisterValues,
  loginFields,
  registerFields,
} from '../../constants/authForm';

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
  buttonMinWidth: {
    minWidth: 105,
  },
}));

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
  const loading = useSelector((state: RootState) => state.user.loading);
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const isLogin = pathname === ROUTES.LOGIN;

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

  const renderButtonContent = () => {
    if (loading) {
      return <CircularProgress color="secondary" size={24} />;
    }

    return isLogin ? 'LOGIN' : 'REGISTER';
  };

  const buttonContent = renderButtonContent();

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={isLogin ? initialLoginValues : initialRegisterValues}
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
                disabled={!dirty || !isValid || loading}
                className={classes.buttonMinWidth}
              >
                {buttonContent}
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
