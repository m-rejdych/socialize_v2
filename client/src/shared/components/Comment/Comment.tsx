import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import {
  Avatar,
  Card,
  Box,
  CardHeader,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { formatDistance } from 'date-fns';

import ROUTES from '../../constants/routes';
import CommentType from '../../../interfaces/comment';

const useStyles = makeStyles((theme) => ({
  container: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  card: {
    dispay: 'inline-block',
    backgroundColor: theme.palette.grey[700],
    borderRadius: 30,
    marginLeft: theme.spacing(1),
  },
  paddingSmall: {
    padding: `${theme.spacing(1.5)}px !important`,
  },
  paddingBottomZero: {
    paddingBottom: '0 !important',
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
    <Box display="flex" className={classes.container}>
      <Avatar onClick={navigateToProfile} className={classes.pointer} />
      <Card className={classes.card}>
        <CardHeader
          title={`${author?.firstName || ''} ${author?.lastName || ''}`}
          subheader={formatDistance(new Date(createdAt), new Date(), {
            addSuffix: true,
          })}
          className={classNames(
            classes.paddingSmall,
            classes.paddingBottomZero,
          )}
          titleTypographyProps={{
            variant: 'subtitle2',
            onClick: navigateToProfile,
          }}
          subheaderTypographyProps={{ variant: 'caption' }}
          classes={{
            title: classNames(classes.bold, classes.pointer),
            subheader: classes.semiBold,
          }}
        />
        <CardContent className={classes.paddingSmall}>
          <Typography variant="body2">{content}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Comment;
