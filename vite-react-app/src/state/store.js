import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import stateReducer from "./properties";
import locationReducer from "./location";

const store = configureStore({
  reducer: {
    user: userReducer, //El objeto de mi estado
    properties: stateReducer,
    location: locationReducer,
  },
});
export default store;
