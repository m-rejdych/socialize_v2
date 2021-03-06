import { ActionObject } from './action';

export default interface StrategyMap<T> {
  [key: string]: <U, V>(state: T, action: ActionObject<U, V>) => T;
  __default__: (state: T) => T;
}
