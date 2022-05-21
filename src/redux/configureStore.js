// import reducer from "./reducer";
import { commentsReducer } from "./comments";
import { dishesReducer } from "./dishes";
import { leadersReducer } from "./leaders";
import { promotionsReducer } from "./promotions";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    comments: commentsReducer,
    dishes: dishesReducer,
    leaders: leadersReducer,
    promotions: promotionsReducer,
  },
});

export default store;
