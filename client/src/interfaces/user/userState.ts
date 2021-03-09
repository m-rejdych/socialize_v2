export default interface UserState {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  loading: boolean;
  initialLoad: boolean;
  error: string | null;
}
