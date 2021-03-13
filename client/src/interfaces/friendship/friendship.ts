import User from '../user';

export default interface Friendship {
  id: number;
  isAccepter: boolean;
  createdAt: Date;
  updatedAt: Date;
  requestedBy: User;
  addressedTo: User;
}
