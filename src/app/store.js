import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import tableSelectorReducer from "../features/tableSelectors/selectorSlice";
import logger from "redux-logger";
const middleware = [...getDefaultMiddleware(), logger];

export default configureStore({
  reducer: {
    counter: counterReducer,
    tableSelector: tableSelectorReducer,
  },
  middleware,
});
