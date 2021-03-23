import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, makeStyles } from '@material-ui/core';

import RootState from '../../../../interfaces/store';
import Post from '../../../../shared/components/Post';
import { getFeed } from '../../../../store/actions/postActions';

const useStyles = makeStyles((theme) => ({
  overflowYAuto: {
    overflowY: 'auto',
  },
}));

const Feed: React.FC = () => {
  const feed = useSelector((state: RootState) => state.post.feed);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getFeed(null));
  }, []);

  return (
    <Box height="calc(100% - 75px)" className={classes.overflowYAuto}>
      {feed.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </Box>
  );
};

export default Feed;
