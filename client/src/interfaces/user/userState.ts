import User from './user';

export default interface UserState extends User {
  loading: boolean;
  initialLoad: boolean;
  error: string | null;
}
