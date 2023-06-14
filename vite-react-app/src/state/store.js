import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import stateReducer from "./properties";
import locationReducer from "./location";
import categoryReducer from "./categories";

const store = configureStore({
  reducer: {
    user: userReducer, //El objeto de mi estado
    properties: stateReducer,
    location: locationReducer,
    categories: categoryReducer,
  },
});
export default store;
