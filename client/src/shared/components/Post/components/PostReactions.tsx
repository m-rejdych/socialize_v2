import { useDispatch, useSelector } from 'react-redux';
import {
  CardActions,
  IconButton,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import {
  ThumbUpAltOutlined,
  ThumbUpAlt,
  ThumbDownAltOutlined,
  ThumbDownAlt,
  FavoriteBorder,
  FavoriteOutlined,
  EmojiEmotionsOutlined,
  EmojiEmotions,
  EmojiObjectsOutlined,
  EmojiObjects,
} from '@material-ui/icons';
import { deepPurple, green, amber } from '@material-ui/core/colors';

import {
  addPostReaction,
  deletePostReaction,
} from '../../../../store/actions/postActions';
import { ReactionName } from '../../../../interfaces/reactionType/reactionType';
import PostReaction from '../../../../interfaces/post/postReaction';
import RootState from '../../../../interfaces/store';

const useStyles = makeStyles((theme) => ({
  cardActions: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

interface Props {
  postId: number;
  reactions?: PostReaction[];
}

const PostReactions: React.FC<Props> = ({ postId, reactions }) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();
  const classes = useStyles();

  const reactionName =
    reactions?.find(({ user }) => user?.id === userId)?.type?.name || null;

  const fields = [
    {
      id: `${postId}-reaction-button-like`,
      type: 'like',
      icon: (
        <Tooltip title="Like">
          {reactionName === 'like' ? (
            <ThumbUpAlt fontSize="small" color="primary" />
          ) : (
            <ThumbUpAltOutlined fontSize="small" />
          )}
        </Tooltip>
      ),
    },
    {
      id: `${postId}-reaction-button-dislike`,
      type: 'dislike',
      icon: (
        <Tooltip title="Dislike">
          {reactionName === 'dislike' ? (
            <ThumbDownAlt fontSize="small" color="secondary" />
          ) : (
            <ThumbDownAltOutlined fontSize="small" />
          )}
        </Tooltip>
      ),
    },
    {
      id: `${postId}-reaction-button-love`,
      type: 'love',
      icon: (
        <Tooltip title="Love">
          {reactionName === 'love' ? (
            <FavoriteOutlined fontSize="small" htmlColor={deepPurple[500]} />
          ) : (
            <FavoriteBorder fontSize="small" />
          )}
        </Tooltip>
      ),
    },
    {
      id: `${postId}-reaction-button-laugh`,
      type: 'laugh',
      icon: (
        <Tooltip title="Laugh">
          {reactionName === 'laugh' ? (
            <EmojiEmotions fontSize="small" htmlColor={amber[500]} />
          ) : (
            <EmojiEmotionsOutlined fontSize="small" />
          )}
        </Tooltip>
      ),
    },
    {
      id: `${postId}-reaction-button-idea`,
      type: 'idea',
      icon: (
        <Tooltip title="Idea">
          {reactionName === 'idea' ? (
            <EmojiObjects fontSize="small" htmlColor={green[500]} />
          ) : (
            <EmojiObjectsOutlined fontSize="small" />
          )}
        </Tooltip>
      ),
    },
  ] as const;

  const handleAddReaction = (type: ReactionName): void => {
    dispatch(
      reactionName === type
        ? deletePostReaction(postId)
        : addPostReaction({ postId, reactionName: type }),
    );
  };

  return (
    <CardActions className={classes.cardActions}>
      {fields.map(({ id, type, icon }) => (
        <IconButton key={id} onClick={() => handleAddReaction(type)}>
          {icon}
        </IconButton>
      ))}
    </CardActions>
  );
};

export default PostReactions;
