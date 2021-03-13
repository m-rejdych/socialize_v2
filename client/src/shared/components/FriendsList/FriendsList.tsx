import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  List,
  Box,
  CircularProgress,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  makeStyles,
} from '@material-ui/core';

import RootState from '../../../interfaces/store';
import { getAllFriendships } from '../../../store/actions/friendshipActions';

const useStyles = makeStyles((theme) => ({
  listItem: {
    borderRadius: 20,
  },
}));

interface Props {
  profileNavigation?: boolean;
}

const FriendsList: React.FC<Props> = ({ profileNavigation }) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const initialLoad = useSelector(
    (state: RootState) => state.friendship.initialLoad,
  );
  const allFriendships = useSelector(
    (state: RootState) => state.friendship.allFriendships,
  );
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFriendships(null));
  }, []);

  const friends = allFriendships
    .filter(({ isAccepted }) => isAccepted)
    .map(({ requestedBy, addressedTo }) => {
      if (requestedBy.id === userId) return addressedTo;
      return requestedBy;
    });

  const handleClick = (id: number): void => {
    if (profileNavigation) {
      history.push(`/profile/${id}`);
    }
  };

  return initialLoad ? (
    <List>
      {friends.map(({ firstName, lastName, id }) => (
        <ListItem
          key={`profile-${id}`}
          divider
          button
          className={classes.listItem}
          onClick={() => handleClick(id)}
        >
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText>{`${firstName} ${lastName}`}</ListItemText>
        </ListItem>
      ))}
    </List>
  ) : (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={200} color="secondary" />
    </Box>
  );
};

export default FriendsList;
