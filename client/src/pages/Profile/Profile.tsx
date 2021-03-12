import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from '@material-ui/core';

import { getUserInfo } from '../../store/actions/profileActions';
// import RootState from '../../interfaces/store';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo({ userId: Number(id) }));
  }, []);

  return <Box />;
};

export default Profile;
