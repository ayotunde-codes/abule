import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import inbox from './inbox/reducer';
import calendar from './calendar/reducer';
import calendarActivity from './calendar-activity/reducer';
import viewActivity from './view-activity/reducer';
import settings from './settings/reducer';
import gallery from './gallery/reducer';
import search from './search/reducer';
import toastAlert from './toast-alert/reducer';
import payment from './payment/reducer';
import dropdown from './dropdown/reducer';
import auth from './auth/reducer';
import accessDenied from './access-denied/reducer';
import editProfile from './edit-profile/reducer';
import admin from './admin/reducer';

const allReducers = combineReducers({
  admin,
  accessDenied,
  calendarActivity,
  inbox,
  toastAlert,
  search,
  calendar,
  gallery,
  settings,
  editProfile,
  viewActivity,
  payment,
  dropdown,
  auth,
});
export default function reducers(state, action) {
  if (action.type === 'SIGN_OUT') {
    storage.removeItem('persist:Abule');
    state = undefined;
  }
  return allReducers(state, action);
}
