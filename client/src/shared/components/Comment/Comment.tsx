import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { formatDistance } from 'date-fns';

import ROUTES from '../../constants/routes';
import CommentType from '../../../interfaces/comment';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.grey[700],
    borderRadius: 15,
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
  pointer: {
    cursor: 'pointer',
  },
}));

interface Props extends CommentType {}

const Comment: React.FC<Props> = ({ author, content, createdAt }) => {
  const history = useHistory();
  const classes = useStyles();

  const navigateToProfile = (): void => {
    if (author) {
      history.push(`${ROUTES.PROFILE}/${author.id}`);
    }
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        title={`${author?.firstName || ''} ${author?.lastName || ''}`}
        subheader={formatDistance(new Date(createdAt), new Date(), {
          addSuffix: true,
        })}
        avatar={
          <Avatar onClick={navigateToProfile} className={classes.pointer} />
        }
        titleTypographyProps={{ onClick: navigateToProfile }}
        classes={{
          title: classNames(classes.bold, classes.pointer),
          subheader: classes.semiBold,
        }}
      />
      <CardContent>
        <Typography>{content}</Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
