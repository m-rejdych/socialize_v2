import { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { formatDistance } from 'date-fns';

import Card from '../Card';
import PostType from '../../../interfaces/post';
import EditPostDialog from '../NewPostDialog';
import RootState from '../../../interfaces/store';

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
  const [open, setOpen] = useState(false);
  const userId = useSelector((state: RootState) => state.user.id);
  const classes = useStyles();

  const editData = { id, title, content };
  const isMe = userId === author?.id;

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Card className={classNames(classes.card)}>
      <CardHeader
        avatar={<Avatar />}
        action={
          isMe && (
            <IconButton onClick={handleOpen}>
              <Edit />
            </IconButton>
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
    </Card>
  );
};

export default Post;
