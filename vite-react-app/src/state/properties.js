import { createReducer, createAction } from "@reduxjs/toolkit";

export const getState = createAction("GET_STATE");

const initialState = "alquiler";

const stateReducer = createReducer(initialState, {
  [getState]: (state, action) => action.payload,
});

export default stateReducer;
