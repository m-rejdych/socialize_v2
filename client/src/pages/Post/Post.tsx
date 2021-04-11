import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from '@material-ui/core';

import { getSelectedPost } from '../../store/actions/postActions';
import PostElement from '../../shared/components/Post';
import RootState from '../../interfaces/store';

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const selectedPost = useSelector(
    (state: RootState) => state.post.selectedPost,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getSelectedPost(Number(id)));
    }
  }, [id]);

  return selectedPost ? (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <PostElement {...selectedPost} />
    </Box>
  ) : null;
};

export default Post;
