import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  makeStyles,
  IconButton,
  Box,
  Tooltip,
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { formatDistance } from 'date-fns';

import ROUTES from '../../../shared/constants/routes';
import PostType from '../../../interfaces/post';
import EditPostDialog from '../NewPostDialog';
import RootState from '../../../interfaces/store';
import ConfirmationDialog from '../ConfirmationDialog';
import ReactionButtons from '../../../shared/components/ReactionButtons';
import ReactionsCounter from '../../../shared/components/ReactionsCounter';
import Comments from './components/Comments';
import { deletePost } from '../../../store/actions/postActions';

const useStyles = makeStyles((theme) => ({
  card: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  bold: {
    fontWeight: 700,
  },
  semiBold: {
    fontWeight: 600,
  },
  commentsCounter: {
    cursor: 'pointer',
    margin: theme.spacing(2),
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  pointer: {
    cursor: 'pointer',
  },
  horizontalDividers: {
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

interface Props extends PostType {}

const Post: React.FC<Props> = ({
  id,
  title,
  author,
  content,
  createdAt,
  reactions,
  comments,
}) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const editData = { id, title, content };
  const isMe = userId === author?.id;

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleOpenConfirmation = (): void => {
    setConfirmationOpen(true);
  };

  const handleCloseConfirmation = (): void => {
    setConfirmationOpen(false);
  };

  const handleDelete = (): void => {
    if (isMe) {
      dispatch(deletePost(id));
    }
  };

  const toggleComments = (): void => {
    setCommentsOpen((prev) => !prev);
  };

  const navigateToProfile = (): void => {
    if (author) {
      history.push(`${ROUTES.PROFILE}/${author.id}`);
    }
  };

  return (
    <Card className={classNames(classes.card)}>
      <CardHeader
        avatar={
          <Avatar onClick={navigateToProfile} className={classes.pointer} />
        }
        action={
          isMe && (
            <Box display="flex">
              <Tooltip title="Edit">
                <IconButton onClick={handleOpen}>
                  <Edit color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={handleOpenConfirmation}>
                  <Delete htmlColor="#f44336" />
                </IconButton>
              </Tooltip>
            </Box>
          )
        }
        title={title}
        subheader={`${author?.firstName || ''} ${
          author?.lastName || ''
        }, ${formatDistance(new Date(createdAt), new Date(), {
          addSuffix: true,
        })}`}
        subheaderTypographyProps={{ onClick: navigateToProfile }}
        classes={{
          title: classes.bold,
          subheader: classNames(classes.semiBold, classes.pointer),
        }}
      />
      <CardContent>
        <Typography>{content}</Typography>
      </CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        {reactions && reactions.length > 0 && (
          <ReactionsCounter reactions={reactions} id={id} />
        )}
        {comments && comments.length > 0 && (
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.commentsCounter}
            onClick={toggleComments}
          >
            Comments: {comments.length}
          </Typography>
        )}
      </Box>
      <CardActions className={classes.horizontalDividers}>
        <ReactionButtons postId={id} reactions={reactions} />
      </CardActions>
      <Comments postId={id} comments={comments} open={commentsOpen} />
      {open && (
        <EditPostDialog open={open} onClose={handleClose} editData={editData} />
      )}
      {confirmationOpen && (
        <ConfirmationDialog
          open={confirmationOpen}
          onClose={handleCloseConfirmation}
          title="Are you sure, that you want to delete this post?"
          action={handleDelete}
        />
      )}
    </Card>
  );
};

export default Post;
