import { ActionObject } from './action';

type ValueOf<T> = T[keyof T];

type StrategyMap<T, U extends { [key: string]: string }> = Partial<
  Record<ValueOf<U>, (state: T, action: ActionObject<any, any>) => T>
>;

export default StrategyMap;
