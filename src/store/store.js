import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './projectSlice'; 
import headerReducer from './headerSlice'; 
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    project: projectReducer,
    header: headerReducer, 
    user: userReducer
  },
});
