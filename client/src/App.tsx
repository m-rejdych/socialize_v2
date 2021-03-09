import { useEffect } from 'react';
import classNames from 'classnames';
import { Box, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Main from './shared/components/Main';
import Routes from './shared/components/Routes';
// import Background from './assets/background-3.jpg';
import { ReactComponent as LightBlobs } from './assets/light-blobs.svg';
import { ReactComponent as DarkBlobs } from './assets/dark-blobs.svg';
import { autoLogin } from './store/actions/authActions';

const useStyles = makeStyles((theme) => ({
  svg: {
    position: 'absolute',
    filter: 'blur(60px)',
  },
  darkBlobs: {
    left: 0,
    bottom: 0,
  },
  lightBlobs: {
    right: 0,
    top: 0,
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin(null));
  }, []);

  return (
    <Box height="100vh" px={10} py={7} position="relative">
      <LightBlobs className={classNames(classes.svg, classes.lightBlobs)} />
      <DarkBlobs className={classNames(classes.svg, classes.darkBlobs)} />
      <Main>
        <Routes />
      </Main>
    </Box>
  );
};

export default App;
