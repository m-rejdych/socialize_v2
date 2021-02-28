import { Box, makeStyles, CardHeader } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import Card from '../../shared/components/Card';
import AuthForm from './components/AuthForm';
import ROUTES from '../../shared/constants/routes';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 400,
  },
}));

const Auth: React.FC = () => {
  const classes = useStyles();
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
        <CardHeader title={isLogin ? 'LOG IN' : 'REGISTER'} />
        <AuthForm />
      </Card>
    </Box>
  );
};

export default Auth;
