import { useRef } from 'react';
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
    width: '100%',
    margin: 0,
  },
}));

const Main: React.FC = ({ children }) => {
  const initialLoad = useSelector((state: RootState) => state.user.initialLoad);
  const userId = useSelector((state: RootState) => state.user.id);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const classes = useStyles();

  return (
    <Container>
      <div ref={gridRef}>
        {initialLoad ? (
          userId ? (
            <Grid container spacing={3} className={classes.gridContainer}>
              <Grid item xs={3}>
                <Dashboard
                  width={
                    gridRef.current
                      ? gridRef.current.offsetWidth * 0.25 - 3 * 8
                      : 'auto'
                  }
                />
              </Grid>
              <Grid item xs={9}>
                {children}
              </Grid>
            </Grid>
          ) : (
            children
          )
        ) : (
          <Box
            height="100vh"
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
