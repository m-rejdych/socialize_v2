import {
  makeStyles,
  Box,
  CircularProgress,
  Grid,
  Container,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import RootState from '../../../interfaces/store';
import Dashboard from '../Dashboard';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: '100%',
    width: '100%',
    margin: 0,
  },
  gridItem: {
    height: '100%',
  },
  absolute: {
    position: 'absolute',
  },
}));

const Main: React.FC = ({ children }) => {
  const classes = useStyles();
  const initialLoad = useSelector((state: RootState) => state.user.initialLoad);
  const userId = useSelector((state: RootState) => state.user.id);

  return (
    <Container>
      <div>
        {initialLoad ? (
          userId ? (
            <Grid container spacing={3} className={classes.gridContainer}>
              <Grid item xs={3}>
                <Dashboard />
              </Grid>
              <Grid item xs={9} className={classes.gridItem}>
                {children}
              </Grid>
            </Grid>
          ) : (
            children
          )
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
      </div>
    </Container>
  );
};

export default Main;
