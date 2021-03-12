import Country from '../country';
import City from '../city';
import Relationship from '../relationship';

interface ProfileState {
  id: number;
  age?: number | null;
  country?: Country;
  city?: City;
  relationship?: Relationship;
  createdAt?: Date;
  updatedAt?: Date;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  loading: boolean;
  error: string | null;
}

export default ProfileState;
