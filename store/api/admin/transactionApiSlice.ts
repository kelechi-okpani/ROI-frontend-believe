import { apiSlice } from "../apiSlice";
import { ChatUser } from "./chatListApiSlice";


export interface Transaction {
  _id: string;
  userId: ChatUser;
  amount: number;
  type: "DEPOSIT" | "WITHDRAWAL" | "ADJUSTMENT" | string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  adminNote?: string;
  reference: string;
  createdAt: string;
}

export interface ReviewTransactionPayload {
  id: string;
  action: "APPROVE" | "REJECT";
}

export const adminTransactionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingTransactions: builder.query<Transaction[], void>({
      query: () => "/admin/transactions",
      providesTags: ["Transaction"],
    }),
    reviewTransaction: builder.mutation<{ message: string }, ReviewTransactionPayload>({
      query: ({ id, action }) => ({
        // FIXED: Dropped redundant prefixed '/api' token route element to prevent query fracturing
        url: `/admin/transactions/${id}`,
        method: "PATCH",
        body: { action },
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),
  }),
});

export const { useGetPendingTransactionsQuery, useReviewTransactionMutation } = adminTransactionsApiSlice;