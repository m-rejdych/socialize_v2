import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

import RootState from '../../../../../interfaces/store';
import Chat from '../../../../../interfaces/chat';
import ROUTES from '../../../../../shared/constants/routes';

const useStyles = makeStyles((theme) => ({
  listItem: {
    borderRadius: 20,
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
}));

interface Props extends Chat {}

const FriendsChatsListItem: React.FC<Props> = ({ id, name, members }) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const { pathname } = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const friend = members?.find(({ id }) => id !== userId);
  const text =
    name || `${friend ? `${friend.firstName} ${friend.lastName}` : 'Chat'}`;
  const isSelected = pathname === `${ROUTES.CHAT}/${id}`;

  const navigateToConversation = (): void => {
    history.push(`${ROUTES.CHAT}/${id}`);
  };

  return (
    <ListItem
      button
      selected={isSelected}
      onClick={navigateToConversation}
      className={classes.listItem}
    >
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText>{text}</ListItemText>
    </ListItem>
  );
};

export default FriendsChatsListItem;
