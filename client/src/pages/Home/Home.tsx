import { Box, Grid, makeStyles } from '@material-ui/core';

import Dashboard from './components/Dashboard';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: '100%',
    width: '100%',
    margin: 0,
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Box height="100%">
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={3}>
          <Dashboard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
