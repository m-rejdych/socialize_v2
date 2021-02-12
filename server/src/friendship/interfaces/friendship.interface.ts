import User from '../../user/interfaces/user.interface';

interface Friendship {
  id: number;
  isAccpted: boolean;
  createdAt: Date;
  updatedAt: Date;
  requestedBy: User;
  addressedTo: User;
}

export default Friendship;
