import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  makeStyles,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';

import { getUserInfo } from '../../store/actions/profileActions';
import Card from '../../shared/components/Card';
import RootState from '../../interfaces/store';

const useStyles = makeStyles((theme) => ({
  '@keyframes slide-in': {
    from: {
      opacity: 0.8,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  card: {
    position: 'relative',
    height: '70%',
    width: '100%',
    overflow: 'visible',
    mr: theme.spacing(2),
    alignSelf: 'flex-end',
    animation: '$slide-in 0.5s ease-out',
  },
  profileImg: {
    width: 300,
    height: 300,
  },
  header: {
    fontWeight: 600,
  },
  headerContainer: {
    transform: 'translateX(-50%)',
    '&::after': {
      content: "''",
      position: 'absolute',
      bottom: theme.spacing(3),
      top: 175 + theme.spacing(3),
      right: 0,
      left: 0,
      width: '100%',
      borderLeft: `1px solid ${theme.palette.divider}`,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
}));

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const loading = useSelector((state: RootState) => state.profile.loading);
  const firstName = useSelector(
    (state: RootState) => state.profile.user.firstName,
  );
  const lastName = useSelector(
    (state: RootState) => state.profile.user.lastName,
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getUserInfo({ userId: Number(id) }));
  }, []);

  return (
    <Box height="100%" display="flex">
      <Card className={classes.card}>
        {loading ? (
          <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress size={300} color="primary" />
          </Box>
        ) : (
          <Box
            position="absolute"
            top={-175}
            left="50%"
            height="calc(100% + 175px)"
            px={3}
            className={classes.headerContainer}
          >
            <AccountBox color="primary" className={classes.profileImg} />
            <Typography
              align="center"
              variant="h3"
              className={classes.header}
            >{`${firstName} ${lastName}`}</Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Profile;
