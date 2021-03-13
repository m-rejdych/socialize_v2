import City from '../city';
import Country from '../country';
import Relationship from '../relationship';
import User from '../user';

export interface GetProfileRes {
  data?: {
    id: number;
    age?: number | null;
    country?: Country;
    city?: City;
    relationship?: Relationship;
    createdAt: Date;
    updatedAt: Date;
    user: User;
  };
}
