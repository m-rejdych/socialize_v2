export interface ActionObject<T, U> {
  type: T;
  payload: U;
}

export type Action<T, U> = (payload: U) => ActionObject<T, U>;

export default Action;
