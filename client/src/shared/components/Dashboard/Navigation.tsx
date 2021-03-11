import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from '@material-ui/core';
import { Home, AccountBox, Chat } from '@material-ui/icons';

import RootState from '../../../interfaces/store';
import ROUTES from '../../constants/routes';
import { setNavigationItem } from '../../../store/actions/dashboardActions';

const useStyles = makeStyles((theme) => ({
  listItem: {
    borderRadius: 20,
    cursor: 'pointer',
    overflow: 'hidden',
  },
}));

const Navigation = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const selectedItem = useSelector(
    (state: RootState) => state.dashboard.selectedItem,
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const fields = [
    {
      value: 'home',
      label: 'Home',
      Icon: Home,
      handleClick: () => {
        history.push(ROUTES.HOME);
        dispatch(setNavigationItem('home'));
      },
    },
    {
      value: 'profile',
      label: 'Profile',
      Icon: AccountBox,
      handleClick: () => {
        history.push(`${ROUTES.PROFILE}/${userId}`);
        dispatch(setNavigationItem('profile'));
      },
    },
    {
      value: 'messages',
      label: 'Messages',
      Icon: Chat,
      handleClick: () => {
        history.push(ROUTES.HOME);
        dispatch(setNavigationItem('home'));
      },
    },
  ] as const;

  return (
    <List>
      {fields.map(({ value, label, Icon, handleClick }) => (
        <ListItem
          divider
          key={value}
          selected={selectedItem === value}
          onClick={handleClick}
          className={classes.listItem}
        >
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText>{label}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default Navigation;
