import { configureStore } from "@reduxjs/toolkit";

import { sportApi } from "../features/Api/SportApi";

export const store = configureStore({
  reducer: {
    [sportApi.reducerPath]: sportApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sportApi.middleware),
});
