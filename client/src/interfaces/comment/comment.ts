import User from '../user';
import Post from '../post';
import CommentReaction from './commentReaction';

export default interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  post?: Post;
  author?: User;
  reactions?: CommentReaction[];
}
