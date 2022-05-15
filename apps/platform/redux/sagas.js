// sagas.js

import { all, fork } from 'redux-saga/effects';

const Saga = function* () {
  yield all([
    // fork(database),
  ]);
};

export default Saga;
