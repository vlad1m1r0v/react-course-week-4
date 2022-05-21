import * as ActionCreators from "./ActionCreators";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  promotions: [],
  isLoading: false,
  errMess: null,
};

const promotionsReducer = createReducer(initialState, (builder) => {
  builder.addCase(ActionCreators.loadPromos.fulfilled, (state, action) => {
    state.promotions = action.payload;
    state.isLoading = false;
  });
  builder.addCase(ActionCreators.loadPromos.pending, (state, action) => {
    state.isLoading = true;
  });
  builder.addCase(ActionCreators.loadPromos.rejected, (state, action) => {
    state.isLoading = false;
    state.errMess = action.payload;
  });
});

export { promotionsReducer };
