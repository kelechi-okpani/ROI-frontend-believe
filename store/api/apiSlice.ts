
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { getSession } from "next-auth/react";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001/api";


const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

const baseQueryWithAuth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const session = await getSession();
  const token:any  = session?.user?.token;
  const modifiedArgs =
    typeof args === "string"
      ? {
          url: args,
          headers: {
            Authorization: token
              ? `Bearer ${token}`
              : "",
          },
        }
      : {
          ...args,

          headers: {
            ...(args.headers || {}),

            Authorization: token
              ? `Bearer ${token}`
              : "",
          },
        };

  return rawBaseQuery(
    modifiedArgs,
    api,
    extraOptions
  );
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  
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
    "Market",
    "Notifications",
  ],

  endpoints: () => ({}),
});
