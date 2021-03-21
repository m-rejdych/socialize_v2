import User from '../user';
import PostReaction from './postReaction';
import Comment from '../comment';

export default interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
  reactions?: PostReaction[];
  comments?: Comment[];
}
