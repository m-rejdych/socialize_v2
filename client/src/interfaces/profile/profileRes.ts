import City from '../city';
import Country from '../country';
import Relationship from '../relationship';

export interface GetProfileRes {
  data?: {
    id: number;
    age?: number | null;
    country?: Country;
    city?: City;
    relationship?: Relationship;
    createdAt: Date;
    updatedAt: Date;
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
    };
  };
}
