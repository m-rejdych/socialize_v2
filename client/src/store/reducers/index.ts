import { combineReducers } from 'redux';

import userReducer from './userReducer';
import dashboardReducer from './dashboardReducer';
import profileReducer from './profileReducer';
import friendshipReducer from './friendshipReducer';
import postReducer from './postReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  user: userReducer,
  dashboard: dashboardReducer,
  profile: profileReducer,
  friendship: friendshipReducer,
  post: postReducer,
  chat: chatReducer,
});

export default rootReducer;
