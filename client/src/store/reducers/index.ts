import { combineReducers } from 'redux';

import userReducer from './userReducer';
import dashboardReducer from './dashboardReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  user: userReducer,
  dashboard: dashboardReducer,
  profile: profileReducer,
});

export default rootReducer;
