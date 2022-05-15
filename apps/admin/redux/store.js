import { applyMiddleware, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import Saga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'Abule',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(Saga);
export default store;
