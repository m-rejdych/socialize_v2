import { Box, makeStyles } from '@material-ui/core';

import Main from './shared/components/Main';
import Auth from './pages/Auth';

const useStyles = makeStyles((theme) => ({
  background: {
    background: 'linear-gradient(to right bottom, #A31545, #303030 80%)',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Box height="100vh" px={10} py={7} className={classes.background}>
      <Main>
        <Auth />
      </Main>
    </Box>
  );
};

export default App;
