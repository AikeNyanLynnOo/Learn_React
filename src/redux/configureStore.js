import { createStore, combineReducers, applyMiddleware } from "redux";
import { createForms } from "react-redux-form";

import { Dishes } from "./reducers/dishes";
import { Comments } from "./reducers/comments";
import { Promotions } from "./reducers/promotions";
import { Leaders } from "./reducers/leaders";

import { initialFeedback } from "./forms";

import thunk from "redux-thunk";
import logger from "redux-logger";

const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      ...createForms({
        feedback: initialFeedback,
      }),
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};

export const store = ConfigureStore();
