import { useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  CardContent,
  TextField,
  Box,
  Avatar,
  makeStyles,
} from '@material-ui/core';

import CommentType from '../../../../interfaces/comment';
import Comment from '../../Comment';
import { createComment } from '../../../../store/actions/commentActions';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
  input: {
    backgroundColor: theme.palette.grey[700],
    borderRadius: 20,
  },
}));

interface Props {
  comments?: CommentType[];
  postId: number;
  open: boolean;
}

const Comments: React.FC<Props> = ({ postId, open, comments }) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();

  const sortedComments = useMemo(
    () => comments?.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)) || [],
    [comments],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleCreateComment = (): void => {
    if (value.trim().length > 0) {
      dispatch(createComment({ postId, content: value }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCreateComment();
      setValue('');
    }
  };

  const renderContent = useCallback(() => {
    if (sortedComments.length === 0) return null;

    if (open) {
      return (
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          {sortedComments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </Box>
      );
    }

    return <Comment {...sortedComments[0]} />;
  }, [comments, open]);

  const content = useMemo(() => renderContent(), [comments, open]);

  return (
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar className={classes.avatar} />
        <TextField
          multiline
          fullWidth
          variant="outlined"
          placeholder="Write a comment..."
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          InputProps={{ className: classes.input }}
        />
      </Box>
      {content}
    </CardContent>
  );
};

export default Comments;
