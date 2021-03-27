import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  makeStyles,
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';

import { getUserInfo } from '../../store/actions/profileActions';
import RootState from '../../interfaces/store';
import UserInfo from './components/UserInfo';
import UserActions from './components/UserActions';
import FriendsList from '../../shared/components/FriendsList';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    height: '60vh',
    position: 'relative',
    overflow: 'visible',
    marginRight: theme.spacing(2),
  },
  profileImg: {
    width: 300,
    height: 300,
  },
  header: {
    fontWeight: 600,
  },
  fullHeight: {
    height: '100%',
  },
  flexContainer: {
    position: 'relative',
    top: -125,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  borderRight: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  borderLeft: {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
}));

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = useSelector((state: RootState) => state.user.id);
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
    dispatch(getUserInfo(Number(id)));
  }, [id]);

  const isMe = userId === Number(id);

  return (
    <Box minHeight="100vh" display="flex" alignItems="center">
      <Card className={classes.card}>
        <CardContent className={classes.fullHeight}>
          {!loading ? (
            <Grid container spacing={3} className={classes.fullHeight}>
              <Grid item xs={4} className={classes.borderRight}>
                <UserInfo isMe={isMe} />
              </Grid>
              <Grid item xs={4} className={classes.flexContainer}>
                <AccountBox color="primary" className={classes.profileImg} />
                <Typography
                  align="center"
                  variant="h3"
                  className={classes.header}
                >{`${firstName} ${lastName}`}</Typography>
              </Grid>
              <Grid item xs={4} className={classes.borderLeft}>
                <Box height="100%" display="flex" flexDirection="column">
                  <Typography variant="h4">
                    {isMe ? 'Friends' : 'Actions'}
                  </Typography>
                  {isMe ? <FriendsList profileNavigation /> : <UserActions />}
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Box
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress size={300} color="primary" />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
