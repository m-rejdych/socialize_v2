import User from '../user';

export default interface Friendship {
  id: number;
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
  requestedBy: User;
  addressedTo: User;
}
