import { useEffect } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Main from './shared/components/Main';
import Routes from './shared/components/Routes';
import Background from './assets/background-3.jpg';
import { autoLogin } from './store/actions/authActions';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'black',
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin(null));
  }, []);

  return (
    <Box height="100vh" px={10} py={7} className={classes.background}>
      <Main>
        <Routes />
      </Main>
    </Box>
  );
};

export default App;
