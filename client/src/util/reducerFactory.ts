import StrategyMap from '../interfaces/store/strategyMap';
import { ActionObject } from '../interfaces/store/action';

const createReducer = <T, U extends { [key: string]: string }>(
  strategyMap: StrategyMap<T, U>,
  initialState: T,
): ((state: T, action: ActionObject<any, any>) => T) => (
  state = initialState,
  action: ActionObject<any, any>,
): T => {
  if (strategyMap[action.type]) return strategyMap[action.type](state, action);
  return state;
};

export default createReducer;
