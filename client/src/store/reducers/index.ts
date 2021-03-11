import { combineReducers } from 'redux';

import userReducer from './userReducer';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
  user: userReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
