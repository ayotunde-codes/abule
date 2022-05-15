import { combineReducers } from 'redux';
import settings from './settings/reducer';

const allReducers = combineReducers({
  settings,
});
export default function reducers(state, action) {
  return allReducers(state, action);
}
