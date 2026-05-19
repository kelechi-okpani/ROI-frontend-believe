import { apiSlice } from "./apiSlice";

export const marketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET LIVE MARKET DATA
    getMarkets: builder.query({
      query: () => "/market",
      providesTags: ["Market"],
      // Keep data fresh by disabling stale caching
      keepUnusedDataFor: 0,
    }),

    // ADDED: CREATE STOCK / CRYPTO MARKET INVESTMENT CONTRACT
    createMarketInvestment: builder.mutation({
      query: (data) => ({
        url: "/user/investments/stock",
        method: "POST",
        body: data,
      }),
      // Automatically triggers Redux to fetch updated balances or portfolio histories if these tags are used globally
      invalidatesTags: ["Investment", "Wallet"],
    }),
  }),
});

export const {
  useGetMarketsQuery,
  useCreateMarketInvestmentMutation, // Clean export hook to drop directly into your MarketDashboard UI component
} = marketApiSlice;