import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import admin from './admin/reducer';
import settings from './settings/reducer';

const allReducers = combineReducers({
  admin,
  settings
});
export default function reducers(state, action) {
  if (action.type === 'SIGN_OUT') {
    storage.removeItem('persist:Abule');
    state = undefined;
  }
  return allReducers(state, action);
}
