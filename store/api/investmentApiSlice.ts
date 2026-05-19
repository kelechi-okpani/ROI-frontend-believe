import { apiSlice } from "./apiSlice";

export const investmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => "/user/investment-plans",
      providesTags: ["InvestmentPlan"],
    }),
    getInvestments: builder.query({
      query: () => "/user/investments",
      providesTags: ["Investment"],
    }),
    createInvestment: builder.mutation({
      query: (data) => ({
        url: "/user/investments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Investment", "Wallet", "Transaction"],
    }),
  }),
});

export const { 
  useGetPlansQuery, 
  useGetInvestmentsQuery, 
  useCreateInvestmentMutation 
} = investmentApiSlice;