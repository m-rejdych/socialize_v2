import Country from '../country';
import City from '../city';
import Relationship from '../relationship';

export interface UpdateUserInfoReq {
  country?: Country;
  city?: City;
  relationship?: Relationship;
  age?: number;
}
