import { combineReducers } from 'redux';

import userReducer from './userReducer';
import dashboardReducer from './dashboardReducer';
import profileReducer from './profileReducer';
import friendshipReducer from './friendshipReducer';

const rootReducer = combineReducers({
  user: userReducer,
  dashboard: dashboardReducer,
  profile: profileReducer,
  friendship: friendshipReducer,
});

export default rootReducer;
