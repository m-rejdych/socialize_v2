import { Box, makeStyles } from '@material-ui/core';

import Card from '../../shared/components/Card';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 300,
    height: 600,
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
      <Card className={classes.card}>Hi</Card>
    </Box>
  );
};

export default Auth;
