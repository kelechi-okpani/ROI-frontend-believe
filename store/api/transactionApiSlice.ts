import { apiSlice } from "./apiSlice";

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWallet: builder.query({
      query: () => "/user/wallet",
      providesTags: ["Wallet"],
    }),
    getTransactions: builder.query({
      query: () => "/user/transaction",
      providesTags: ["Transaction"],
    }),
    requestDeposit: builder.mutation({
      query: (data) => ({
        url: "/user/transaction/deposit", 
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),
    requestWithdrawal: builder.mutation({
      query: (data) => ({
        url: "/user/transaction/withdraw", 
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transaction"],
    }),
    // Admin Only: PATCH /api/admin/transactions/:id
    adminHandleTransaction: builder.mutation({
      query: ({ id, action }) => ({
        url: `/admin/transaction/${id}`,
        method: "PATCH",
        body: { action },
      }),
      invalidatesTags: ["Transaction", "Wallet", "User"],
    }),
  }),
});

export const {
  useGetWalletQuery,
  useGetTransactionsQuery,
  useRequestDepositMutation,
  useRequestWithdrawalMutation,
  useAdminHandleTransactionMutation,
} = transactionApiSlice;