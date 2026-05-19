import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/authSlice";

// Import your API injections to ensure they are registered
// Even if they aren't used in this file, importing them triggers the .injectEndpoints()

import "./api/authApiSlice";
import "./api/userApiSlice";
import "./api/chatApiSlice";
import "./api/investmentApiSlice";
import "./api/transactionApiSlice";


import "./api/admin/adminStatsApiSlice";
import "./api/admin/adminUserApiSlice";
import "./api/admin/chatListApiSlice";
import "./api/admin/adminPlansApiSlice";
import "./api/admin/investmentsApiSlice";
import "./api/admin/transactionApiSlice";


export const store = configureStore({
  reducer: {
    // This handles all RTK Query paths (Chat, Investments, Stats, etc.)
    [apiSlice.reducerPath]: apiSlice.reducer,
    
    // Your local state slices
    auth: authReducer,
  },
  // Middleware handles the caching, invalidation, and polling for all endpoints
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Recommended if handling Dates in investment/chat objects
    }).concat(apiSlice.middleware),
  
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { apiSlice } from "./api/apiSlice";
// import authReducer from "./features/authSlice";

// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     auth: authReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// });

// setupListeners(store.dispatch);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;