import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Tooltip, Box } from '@material-ui/core';
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

import { ReactionName } from '../../../interfaces/reactionType/reactionType';
import {
  addPostReaction,
  deletePostReaction,
} from '../../../store/actions/postActions';
import {
  addCommentReaction,
  deleteCommentReaction,
} from '../../../store/actions/commentActions';
import { addMessageReaction } from '../../../store/actions/messageActions';
import PostReaction from '../../../interfaces/post/postReaction';
import CommentReaction from '../../../interfaces/comment/commentReaction';
import MessageReaction from '../../../interfaces/message/messageReaction';
import RootState from '../../../interfaces/store';

type Reaction = PostReaction | CommentReaction | MessageReaction;

interface Props {
  reactions?: Reaction[];
  postId?: number;
  commentId?: number;
  messageId?: number;
  socket?: SocketIOClient.Socket | null;
}

const ReactionButtons: React.FC<Props> = ({
  reactions,
  postId,
  commentId,
  messageId,
  socket,
}) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();

  const reactionName =
    reactions?.find(({ user }) => user?.id === userId)?.type?.name || null;

  const fields = [
    {
      id: 'reaction-button-like',
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
      id: 'reaction-button-dislike',
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
      id: 'reaction-button-love',
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
      id: 'reaction-button-laugh',
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
      id: 'reaction-button-idea',
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
    const isReacted = reactionName === type;

    if (postId) {
      dispatch(
        isReacted
          ? deletePostReaction(postId)
          : addPostReaction({ postId, reactionName: type }),
      );
    } else if (commentId) {
      dispatch(
        isReacted
          ? deleteCommentReaction(commentId)
          : addCommentReaction({ commentId, reactionName: type }),
      );
    } else if (messageId && socket) {
      dispatch(addMessageReaction({ messageId, reactionName: type, socket }));
    }
  };

  return (
    <Box display="flex" alignItems="center">
      {fields.map(({ id, type, icon }) => (
        <IconButton key={id} onClick={() => handleAddReaction(type)}>
          {icon}
        </IconButton>
      ))}
    </Box>
  );
};

export default ReactionButtons;
