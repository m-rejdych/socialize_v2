import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ROUTES from '../../constants/routes';
import RootState from '../../../interfaces/store';
import Auth from '../../../pages/Auth';
import Home from '../../../pages/Home';
import Profile from '../../../pages/Profile';
import Post from '../../../pages/Post';
import Chat from '../../../pages/Chat';
import Notifications from '../../../pages/Notifications';
import NotificationProvider from '../NotificationProvider';

const Routes: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.id);

  const isAuth = !!userId;

  return isAuth ? (
    <NotificationProvider>
      <Switch>
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={`${ROUTES.PROFILE}/:id`} component={Profile} />
        <Route path={`${ROUTES.POST}/:id`} component={Post} />
        <Route path={`${ROUTES.CHAT}/:id`} component={Chat} />
        <Route path={ROUTES.CHAT} component={Chat} />
        <Route path={ROUTES.NOTIFICATIONS} component={Notifications} />
        <Redirect to={ROUTES.HOME} />
      </Switch>
    </NotificationProvider>
  ) : (
    <Switch>
      <Route path={ROUTES.REGISTER} component={Auth} />
      <Route path={ROUTES.LOGIN} component={Auth} />
      <Redirect to={ROUTES.REGISTER} />
    </Switch>
  );
};

export default Routes;
