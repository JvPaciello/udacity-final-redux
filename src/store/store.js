import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers"; 
import logger from "../middleware/logger"; 


const store = configureStore({
  reducer: rootReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

export default store;
