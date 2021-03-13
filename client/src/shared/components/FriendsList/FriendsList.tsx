import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { List } from '@material-ui/core';

import { getAllFriendships } from '../../../store/actions/friendshipActions';

const FriendsList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFriendships(null));
  }, []);

  return <List>Friends list</List>;
};

export default FriendsList;
