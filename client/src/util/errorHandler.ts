import { logout } from '../store/actions/authActions';
import Action, { ActionObject } from '../interfaces/store/action';
import Error from '../interfaces/error';

const handleError = (
  errorAction: Action<any, string | null>,
  error: Error,
): ActionObject<any, string | null> => {
  if (error.response.status === 401) return logout(null);

  return errorAction(error.response.data.message);
};

export default handleError;
