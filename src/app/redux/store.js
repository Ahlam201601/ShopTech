import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import aiReducer from "./aiSlice"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    ai: aiReducer
  },
});
