import { Action } from '../interfaces/store/action';

const createAction = <T, U>(type: T): Action<T, U> => (payload) => ({
  type,
  payload,
});

export default createAction;
