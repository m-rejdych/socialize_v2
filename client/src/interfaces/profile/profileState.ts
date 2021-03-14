import Profile from './profile';

interface ProfileState extends Profile {
  loading: boolean;
  error: string | null;
}

export default ProfileState;
