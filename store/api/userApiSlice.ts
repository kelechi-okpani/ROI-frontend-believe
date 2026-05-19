import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    
    getUserStats: builder.query({
      query: () => "/user/stats",
      providesTags: ["Stats", "Transaction", "Investment"],
    }),

    getProfile: builder.query({
      query: () => "/user/profile",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});



export const { useGetUserStatsQuery, useGetProfileQuery, useUpdateProfileMutation } = userApiSlice;