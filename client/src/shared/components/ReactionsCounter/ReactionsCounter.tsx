import classNames from 'classnames';
import { Box, Paper, Typography, makeStyles } from '@material-ui/core';
import {
  ThumbUpAlt,
  ThumbDownAlt,
  FavoriteOutlined,
  EmojiEmotions,
  EmojiObjects,
} from '@material-ui/icons';
import { deepPurple, amber, green } from '@material-ui/core/colors';

import PostReaction from '../../../interfaces/post/postReaction';
import CommentReaction from '../../../interfaces/comment/commentReaction';
import MessageReaction from '../../../interfaces/message/messageReaction';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0.5),
    borderRadius: '50%',
    position: 'relative',
  },
  icon: {
    fontSize: 13,
  },
  counter: {
    position: 'relative',
    marginLeft: theme.spacing(1),
  },
  likeColor: {
    backgroundColor: theme.palette.primary.main,
  },
  dislikeColor: {
    backgroundColor: theme.palette.secondary.main,
  },
  loveColor: {
    backgroundColor: deepPurple[500],
  },
  laughColor: {
    backgroundColor: amber[500],
  },
  ideaColor: {
    backgroundColor: green[500],
  },
}));

type Reaction = PostReaction | CommentReaction | MessageReaction;

interface Props {
  id: number;
  reactions?: Reaction[];
  showCount?: boolean;
  className?: string;
}

const ReactionsCounter: React.FC<Props> = ({
  reactions,
  id,
  showCount,
  className,
}) => {
  const classes = useStyles();

  const icons = [
    {
      id: `${id}-reaction-counter-like`,
      type: 'like',
      icon: <ThumbUpAlt className={classes.icon} />,
      hidden: !reactions?.some((reaction) => reaction.type?.name === 'like'),
    },
    {
      id: `${id}-reaction-counter-dislike`,
      type: 'dislike',
      icon: <ThumbDownAlt className={classes.icon} />,
      hidden: !reactions?.some((reaction) => reaction.type?.name === 'dislike'),
    },
    {
      id: `${id}-reaction-counter-love`,
      type: 'love',
      icon: <FavoriteOutlined className={classes.icon} />,
      hidden: !reactions?.some((reaction) => reaction.type?.name === 'love'),
    },
    {
      id: `${id}-reaction-counter-laugh`,
      type: 'laugh',
      icon: <EmojiEmotions className={classes.icon} />,
      hidden: !reactions?.some((reaction) => reaction.type?.name === 'laugh'),
    },
    {
      id: `${id}-reaction-counter-idea`,
      type: 'idea',
      icon: <EmojiObjects className={classes.icon} />,
      hidden: !reactions?.some((reaction) => reaction.type?.name === 'idea'),
    },
  ] as const;

  return (
    <Box display="flex" alignItems="center" className={className}>
      <Box display="flex" alignItems="flex-start" flexWrap="nowrap">
        {icons
          .filter(({ hidden }) => !hidden)
          .map(({ id, type, icon }, index) => (
            <Paper
              key={id}
              elevation={3}
              className={classNames(
                classes.paper,
                type === 'like' && classes.likeColor,
                type === 'dislike' && classes.dislikeColor,
                type === 'love' && classes.loveColor,
                type === 'laugh' && classes.laughColor,
                type === 'idea' && classes.ideaColor,
              )}
              style={{ left: index * -8 }}
            >
              {icon}
            </Paper>
          ))}
      </Box>
      {reactions && showCount && (
        <Typography
          variant="body2"
          className={classes.counter}
          style={{
            left: (icons.filter(({ hidden }) => !hidden).length - 1) * -8,
          }}
        >
          {reactions.length}
        </Typography>
      )}
    </Box>
  );
};

export default ReactionsCounter;
