import { combineReducers, CombinedState } from 'redux';

import userReducer from './userReducer';
import profileReducer from './profileReducer';
import friendshipReducer from './friendshipReducer';
import postReducer from './postReducer';
import chatReducer from './chatReducer';
import { ActionObject } from '../../interfaces/store/action';
import { AUTH } from '../../shared/constants/actionTypes';

const appReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  friendship: friendshipReducer,
  post: postReducer,
  chat: chatReducer,
});

const rootReducer = (
  state:
    | CombinedState<{
        user: never;
        profile: never;
        friendship: never;
        post: never;
        chat: never;
      }>
    | undefined,
  action: ActionObject<any, any>,
) => {
  if (action.type === AUTH.LOGOUT) state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
