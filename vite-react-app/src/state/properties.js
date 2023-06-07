import { createReducer, createAction } from "@reduxjs/toolkit";

const getAllProperties = createAction("GET_PROPERTIES");

const initialState = {
  description: null,
  address: null,
  price: null,
  image: null,
  locality: null,
  bedrooms: null,
  baths: null,
  square_meters: null,
  post_date: null,
  state: null,
};

const propertiesReducer = createReducer(initialState, {
  [getAllProperties]: (state, action) => action.payload,
});

export default propertiesReducer;
