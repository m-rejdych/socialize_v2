import { Box, makeStyles } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';

import Main from './shared/components/Main';
import Auth from './pages/Auth';
import Background from './assets/background-3.jpg';

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

  return (
    <Box height="100vh" px={10} py={7} className={classes.background}>
      <Main>
        <Switch>
          <Route path="/register" component={Auth} />
          <Route path="/login" component={Auth} />
          <Redirect to="/register" />
        </Switch>
        <Auth />
      </Main>
    </Box>
  );
};

export default App;
