import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth'; // adjust path as needed
import userReducer from './UserSlice'; 
import clientReducer from './addClientDetails';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    client: clientReducer,
  },
});

export default store;
