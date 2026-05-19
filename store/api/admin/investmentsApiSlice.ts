import { apiSlice } from "../apiSlice";
import { ChatUser } from "./chatListApiSlice";


export interface InvestmentPlanSummary {
  name: string;
  roiPercentage: number;
  durationDays: number;
}

export interface InvestmentRequest {
  _id: string;
  userId: ChatUser;
  planId: InvestmentPlanSummary;
  amount: number;
  status: "PENDING" | "ACTIVE" | "CANCELLED" | "COMPLETED";
  createdAt: string;
}

export interface ReviewInvestmentPayload {
  id: string;
  action: "APPROVE" | "REJECT";
}

export const adminInvestmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingInvestments: builder.query<InvestmentRequest[], void>({
      query: () => "/admin/investments",
      providesTags: ["Investment"],
    }),
    reviewInvestment: builder.mutation<{ message: string }, ReviewInvestmentPayload>({
      query: ({ id, action }) => ({
        url: `/admin/investments/${id}`,
        method: "PATCH",
        body: { action },
      }),
      invalidatesTags: ["Investment", "Wallet", "Transaction"],
    }),
  }),
});

export const { useGetPendingInvestmentsQuery, useReviewInvestmentMutation } = adminInvestmentsApiSlice;