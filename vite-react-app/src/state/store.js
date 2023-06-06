import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    user: userReducer, //El objeto de mi estado
  },
});
export default store;
