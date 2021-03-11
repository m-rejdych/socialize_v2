import Country from '../country';
import City from '../city';
import Relationship from '../relationship';

interface ProfileState {
  id: string;
  age?: number;
  country?: Country;
  city?: City;
  relationship: Relationship;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export default ProfileState;
