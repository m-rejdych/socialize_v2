import { combineReducers } from 'redux';

import userReducer from './userReducer';
import profileReducer from './profileReducer';
import friendshipReducer from './friendshipReducer';
import postReducer from './postReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  friendship: friendshipReducer,
  post: postReducer,
  chat: chatReducer,
});

export default rootReducer;
