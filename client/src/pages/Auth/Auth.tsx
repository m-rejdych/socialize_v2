import { Box, makeStyles, CardHeader } from '@material-ui/core';

import Card from '../../shared/components/Card';
import AuthForm from './components/AuthForm';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 400,
  },
}));

const Auth: React.FC = () => {
  const classes = useStyles();

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card className={classes.card}>
        <CardHeader title="LOG IN" />
        <AuthForm />
      </Card>
    </Box>
  );
};

export default Auth;
