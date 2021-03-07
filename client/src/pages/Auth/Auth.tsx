import { Box, makeStyles, CardHeader } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import RootState from '../../interfaces/store/index';

import Card from '../../shared/components/Card';
import AuthForm from './components/AuthForm';
import ROUTES from '../../shared/constants/routes';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 400,
  },
  errorColor: {
    color: theme.palette.error.main,
  },
}));

const Auth: React.FC = () => {
  const classes = useStyles();
  const error = useSelector((state: RootState) => state.user.error);
  const { pathname } = useLocation();

  const isLogin = pathname === ROUTES.LOGIN;

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card className={classes.card}>
        <CardHeader
          title={isLogin ? 'LOG IN' : 'REGISTER'}
          subheader={error}
          subheaderTypographyProps={{ className: classes.errorColor }}
        />
        <AuthForm />
      </Card>
    </Box>
  );
};

export default Auth;
