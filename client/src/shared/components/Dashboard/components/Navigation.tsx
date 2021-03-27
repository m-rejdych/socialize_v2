import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from '@material-ui/core';
import { Home, AccountBox, Chat } from '@material-ui/icons';

import RootState from '../../../../interfaces/store';
import ROUTES from '../../../constants/routes';

const useStyles = makeStyles((theme) => ({
  listItem: {
    borderRadius: 20,
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1.5),
    },
  },
}));

const Navigation: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  const fields = [
    {
      value: 'home',
      label: 'Home',
      selected: pathname === ROUTES.HOME,
      Icon: Home,
      handleClick: () => {
        history.push(ROUTES.HOME);
      },
    },
    {
      value: 'profile',
      label: 'Profile',
      selected: pathname === `${ROUTES.PROFILE}/${userId}`,
      Icon: AccountBox,
      handleClick: () => {
        history.push(`${ROUTES.PROFILE}/${userId}`);
      },
    },
    {
      value: 'messages',
      label: 'Messages',
      selected: false,
      Icon: Chat,
      handleClick: () => {
        history.push(ROUTES.HOME);
      },
    },
  ] as const;

  return (
    <List>
      {fields.map(({ value, label, selected, Icon, handleClick }) => (
        <ListItem
          divider
          button
          key={value}
          selected={selected}
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
