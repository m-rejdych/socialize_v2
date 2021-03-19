import User from '../user';
import ChatType from './chatType';
import Message from '../message';

export default interface Chat {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  members?: User[];
  type?: ChatType;
  messages: Message[];
}
