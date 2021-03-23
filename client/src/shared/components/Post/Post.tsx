import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import {
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  makeStyles,
  IconButton,
  Box,
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { formatDistance } from 'date-fns';

import Card from '../Card';
import PostType from '../../../interfaces/post';
import EditPostDialog from '../NewPostDialog';
import RootState from '../../../interfaces/store';
import ConfirmationDialog from '../ConfirmationDialog';
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
}));

interface Props extends PostType {}

const Post: React.FC<Props> = ({ id, title, author, content, createdAt }) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();
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
    dispatch(deletePost(id));
  };

  return (
    <Card className={classNames(classes.card)}>
      <CardHeader
        avatar={<Avatar />}
        action={
          isMe && (
            <Box display="flex">
              <IconButton onClick={handleOpen}>
                <Edit />
              </IconButton>
              <IconButton onClick={handleOpenConfirmation}>
                <Delete htmlColor="#f44336" />
              </IconButton>
            </Box>
          )
        }
        title={title}
        subheader={`${author?.firstName || ''} ${
          author?.lastName || ''
        }, ${formatDistance(new Date(createdAt), new Date(), {
          addSuffix: true,
        })}`}
        classes={{ title: classes.bold, subheader: classes.semiBold }}
      />
      <CardContent>
        <Typography>{content}</Typography>
      </CardContent>
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
