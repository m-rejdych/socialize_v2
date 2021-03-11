import Action from '../store/action';
import Field from './field';
import { DASHBOARD } from '../../shared/constants/actionTypes';

export type SetNavigationItemAction = Action<
  typeof DASHBOARD.SET_NAVIGATION_ITEM,
  Field
>;
