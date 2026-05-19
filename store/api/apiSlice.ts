
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const LOCAL_URL = "http://localhost:3001/api";
export const LOCAL_URL = "roi-backend-believe.vercel.app/api";

const baseQuery = fetchBaseQuery({
  baseUrl: LOCAL_URL,

  // IMPORTANT
  credentials: "include",

  prepareHeaders: (headers) => {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    return headers;
  },
});

const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.warn("Unauthorized! Session expired.");
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Profile",
    "Wallet",
    "AdminWalletAddress",
    "Transaction",
    "InvestmentPlan",
    "Investment",
    "chat",
    "Chats",
    "Stats",
  ],
  endpoints: () => ({}),
});


// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from "js-cookie";

// // const LOCAL_URL = "http://localhost:8000/api";
// const LOCAL_URL = "http://localhost:3001/api";

// // 1. Define the base query logic
// const baseQuery = fetchBaseQuery({
//   baseUrl: LOCAL_URL,
//   // ✅ MOVE CREDENTIALS HERE: This is a fetch property, not a header
//   credentials: "include", 
//   prepareHeaders: (headers) => {
//     // ❌ REMOVED: headers.set("credentials", "include"); 

//     const token = Cookies.get("token");
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }

//     // fetchBaseQuery handles Content-Type automatically for JSON bodies, 
//     // but keeping this explicit check is fine.
//     if (!headers.has("Content-Type")) {
//       headers.set("Content-Type", "application/json");
//     }

//     return headers;
//   },
// });

// // 2. BaseQuery wrapper for handling 401s
// const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
//   let result = await baseQuery(args, api, extraOptions);
  
//   if (result.error && result.error.status === 401) {
//     console.warn("Unauthorized! User session may have expired.");
//     // Clear cookies or redirect if necessary
//   }
//   return result;
// };

// // 3. Define the API Slice
// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithReauth,
//   tagTypes: [
//     "User", 
//     "Profile", 
//     "AdminWalletAddress", 
//     "Transaction", 
//     "InvestmentPlan", 
//     "Investment", 
//     "chat", 
//     "Stats"
//   ],
//   endpoints: () => ({}),
// });