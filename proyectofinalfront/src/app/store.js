import { configureStore } from '@reduxjs/toolkit';
import detailSlice from '../pages/detailSlice';
import userSlice from '../pages/userSlice';
import videogameSlice from '../pages/videogameSlice';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';

const reducers = combineReducers({
    user: userSlice,
    detail: detailSlice,
    videogame: videogameSlice
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});