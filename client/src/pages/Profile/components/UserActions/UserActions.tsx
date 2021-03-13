import { Button, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: theme.spacing(3),
  },
}));

const UserActions: React.FC = () => {
  const classes = useStyles();

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        justifyContent="center"
      >
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.marginBottom}
        >
          Add as friend
        </Button>
        <Button variant="contained" color="secondary" size="large">
          Send a message
        </Button>
      </Box>
    </Box>
  );
};

export default UserActions;
