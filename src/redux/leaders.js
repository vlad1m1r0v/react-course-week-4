import * as ActionCreators from "./ActionCreators";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  leaders: [],
  isLoading: false,
  errMess: null,
};

const leadersReducer = createReducer(initialState, (builder) => {
  builder.addCase(ActionCreators.loadLeaders.fulfilled, (state, action) => {
    state.leaders = action.payload;
    state.isLoading = false;
  });
  builder.addCase(ActionCreators.loadLeaders.pending, (state, action) => {
    state.isLoading = true;
  });
  builder.addCase(ActionCreators.loadLeaders.rejected, (state, action) => {
    state.isLoading = false;
    state.errMess = action.payload;
  });
});

export { leadersReducer };
