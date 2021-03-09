import { Paper, makeStyles, Box, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import RootState from '../../../interfaces/store';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    background:
      'linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05))',
    borderRadius: 30,
    overflow: 'hidden',
    backdropFilter: 'blur(100px)',
  },
  absolute: {
    position: 'absolute',
  },
  topLeft: {
    top: '10%',
    left: '30%',
  },
  topRight: {
    top: -100,
    right: -100,
    width: 500,
    height: 500,
  },
  bottomRight: {
    bottom: '5%',
    right: '10%',
    width: 100,
  },
  bottomLeft: {
    width: 400,
    height: 400,
    bottom: -100,
    left: -100,
  },
}));

const Main: React.FC = ({ children }) => {
  const classes = useStyles();
  const initialLoad = useSelector((state: RootState) => state.user.initialLoad);

  return (
    <Box position="relative" borderRadius={30} height="100%" overflow="hidden">
      <Paper elevation={3} className={classes.container}>
        {initialLoad ? (
          children
        ) : (
          <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress size={300} color="primary" />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Main;
