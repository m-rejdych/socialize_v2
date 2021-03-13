import Country from '../country';
import City from '../city';
import Relationship from '../relationship';
import User from '../user';

interface ProfileState {
  id: number;
  age?: number | null;
  country?: Country;
  city?: City;
  relationship?: Relationship;
  createdAt?: Date;
  updatedAt?: Date;
  user: User;
  loading: boolean;
  error: string | null;
}

export default ProfileState;
