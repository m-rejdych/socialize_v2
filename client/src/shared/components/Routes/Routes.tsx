import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RootState from '../../../interfaces/store';
import Auth from '../../../pages/Auth';
import Home from '../../../pages/Home';

const Routes = () => {
  const userId = useSelector((state: RootState) => state.user.id);

  const isAuth = !!userId;

  return isAuth ? (
    <Switch>
      <Route path="/home" component={Home} />
      <Redirect to="/home" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/register" component={Auth} />
      <Route path="/login" component={Auth} />
      <Redirect to="/register" />
    </Switch>
  );
};

export default Routes;
