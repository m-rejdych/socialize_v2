export default interface UserState {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  loading: boolean;
  error: string | null;
}
