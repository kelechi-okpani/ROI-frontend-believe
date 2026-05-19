import { apiSlice } from "../apiSlice";

export interface AdminStatsResponse {
  totalUsers: number;
  activeInvestments: number;
  pendingTasks: number;
  totalDepositVolume: number;
}

export const adminStatsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query<AdminStatsResponse, void>({
      query: () => "/admin/stats",
      providesTags: ["Investment", "Transaction", "User"],
    }),
  }),
});

export const { useGetAdminStatsQuery } = adminStatsApiSlice;