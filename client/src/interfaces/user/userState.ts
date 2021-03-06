export default interface UserState {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  loading: boolean;
  error: string | null;
}
