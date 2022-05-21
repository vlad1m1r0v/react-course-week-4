import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  dishes: DISHES,
  comments: COMMENTS,
  promotions: PROMOTIONS,
  leaders: LEADERS,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addDefaultCase((state, action) => {});
});

export default reducer;
