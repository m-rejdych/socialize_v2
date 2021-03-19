import User from '../user';
import Chat from '../chat';
import MessageReaction from './messageReaction';

export default interface Message {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
  chat?: Chat;
  reactions?: MessageReaction[];
  seenBy?: User[];
}
