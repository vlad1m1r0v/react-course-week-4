import * as ActionCreators from "./ActionCreators";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  dishes: [],
  isLoading: true,
  errMess: null,
};

const dishesReducer = createReducer(initialState, (builder) => {
  builder.addCase(ActionCreators.loadDishes.fulfilled, (state, action) => {
    state.dishes = action.payload;
    state.isLoading = false;
  });
  builder.addCase(ActionCreators.loadDishes.pending, (state, action) => {
    state.isLoading = true;
  });
  builder.addCase(ActionCreators.loadDishes.rejected, (state, action) => {
    state.isLoading = false;
    state.errMess = action.payload;
  });
});

export { dishesReducer };
