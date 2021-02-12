import Country from '../../country/interfaces/country.interface';
import City from '../../city/interfaces/city.interface';
import Relationship from '../../relationship/interfaces/relationship.interface';
import User from '../../user/interfaces/user.interface';

interface UserInfo {
  id: number;
  age?: number;
  country?: Country;
  city?: City;
  relaitonship?: Relationship;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export default UserInfo;
