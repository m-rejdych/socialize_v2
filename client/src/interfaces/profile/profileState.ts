import Profile from './profile';

interface ProfileState extends Profile {
  loading: boolean;
  initialLoad: boolean;
  error: string | null;
}

export default ProfileState;
