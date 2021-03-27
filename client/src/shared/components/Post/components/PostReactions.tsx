import { CardActions, IconButton } from '@material-ui/core';
import {
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  FavoriteBorder,
  EmojiEmotionsOutlined,
  EmojiObjectsOutlined,
} from '@material-ui/icons';

const PostReactions: React.FC = () => {
  const fields = [
    {
      type: 'like',
      icon: <ThumbUpAltOutlined fontSize="small" />,
    },
    {
      type: 'dislike',
      icon: <ThumbDownAltOutlined fontSize="small" />,
    },
    {
      type: 'love',
      icon: <FavoriteBorder fontSize="small" />,
    },
    {
      type: 'laugh',
      icon: <EmojiEmotionsOutlined fontSize="small" />,
    },
    {
      type: 'idea',
      icon: <EmojiObjectsOutlined fontSize="small" />,
    },
  ];

  return (
    <CardActions>
      {fields.map(({ type, icon }) => (
        <IconButton key={type}>{icon}</IconButton>
      ))}
    </CardActions>
  );
};

export default PostReactions;
