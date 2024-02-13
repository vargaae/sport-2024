import { configureStore } from "@reduxjs/toolkit";
import { footballApi } from "../features/Api/FootballApi";

export const store = configureStore({
  reducer: {
    [footballApi.reducerPath]: footballApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(footballApi.middleware),
});
