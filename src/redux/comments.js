import * as ActionCreators from "./ActionCreators";
import { createReducer, isAnyOf } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  isLoading: false,
  errMess: null,
};

const commentsReducer = createReducer(initialState, (builder) => {
  builder.addCase(ActionCreators.loadComments.fulfilled, (state, action) => {
    state.comments = action.payload;
    state.isLoading = false;
  });

  builder.addCase(ActionCreators.addComment.fulfilled, (state, action) => {
    state.isLoading = false;
    state.comments = [...state.comments, action.payload];
  });

  builder.addMatcher(
    isAnyOf(
      ActionCreators.loadComments.pending,
      ActionCreators.addComment.pending
    ),
    (state, action) => {
      state.isLoading = true;
    }
  );

  builder.addMatcher(
    isAnyOf(
      ActionCreators.loadComments.rejected,
      ActionCreators.addComment.rejected
    ),
    (state, action) => {
      state.isLoading = false;
      state.errMess = action.payload;
    }
  );
});

export { commentsReducer };
