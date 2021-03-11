import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from '@material-ui/core';
import { Home, AccountBox, Chat } from '@material-ui/icons';

import Field from '../../../../interfaces/dashboard/field';
import RootState from '../../../../interfaces/store';
import { setNavigationItem } from '../../../../store/actions/dashboardActions';

const useStyles = makeStyles((theme) => ({
  listItem: {
    borderRadius: 20,
    cursor: 'pointer',
    overflow: 'hidden',
  },
}));

const fields = [
  {
    value: 'home',
    label: 'Home',
    Icon: Home,
  },
  {
    value: 'profile',
    label: 'Profile',
    Icon: AccountBox,
  },
  {
    value: 'messages',
    label: 'Messages',
    Icon: Chat,
  },
] as const;

const Navigation = () => {
  const selectedItem = useSelector(
    (state: RootState) => state.dashboard.selectedItem,
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSelect = (value: Field): void => {
    dispatch(setNavigationItem(value));
  };

  return (
    <List>
      {fields.map(({ value, label, Icon }) => (
        <ListItem
          divider
          key={value}
          selected={selectedItem === value}
          onClick={() => handleSelect(value)}
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
