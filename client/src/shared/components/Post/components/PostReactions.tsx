import { CardActions, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
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

import {
  addPostReaction,
  deletePostReaction,
} from '../../../../store/actions/postActions';
import { ReactionName } from '../../../../interfaces/reactionType/reactionType';
import PostReaction from '../../../../interfaces/post/postReaction';
import RootState from '../../../../interfaces/store';

interface Props {
  postId: number;
  reactions?: PostReaction[];
}

const PostReactions: React.FC<Props> = ({ postId, reactions }) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();

  const reactionName =
    reactions?.find(({ user }) => user?.id === userId)?.type?.name || null;

  const fields = [
    {
      type: 'like',
      icon:
        reactionName === 'like' ? (
          <ThumbUpAlt fontSize="small" color="secondary" />
        ) : (
          <ThumbUpAltOutlined fontSize="small" />
        ),
    },
    {
      type: 'dislike',
      icon:
        reactionName === 'dislike' ? (
          <ThumbDownAlt fontSize="small" color="secondary" />
        ) : (
          <ThumbDownAltOutlined fontSize="small" />
        ),
    },
    {
      type: 'love',
      icon:
        reactionName === 'love' ? (
          <FavoriteOutlined fontSize="small" color="secondary" />
        ) : (
          <FavoriteBorder fontSize="small" />
        ),
    },
    {
      type: 'laugh',
      icon:
        reactionName === 'laugh' ? (
          <EmojiEmotions fontSize="small" color="secondary" />
        ) : (
          <EmojiEmotionsOutlined fontSize="small" />
        ),
    },
    {
      type: 'idea',
      icon:
        reactionName === 'idea' ? (
          <EmojiObjects fontSize="small" color="secondary" />
        ) : (
          <EmojiObjectsOutlined fontSize="small" />
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
    <CardActions>
      {fields.map(({ type, icon }) => (
        <IconButton key={type} onClick={() => handleAddReaction(type)}>
          {icon}
        </IconButton>
      ))}
    </CardActions>
  );
};

export default PostReactions;
