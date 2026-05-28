import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query({
      query: () => "/user/stats",
      providesTags: ["Stats"],
      // providesTags: ["Stats", "Transaction", "Investment"],
    }),

    getProfile: builder.query({
      query: () => "/user/profile",
      providesTags: ["Profile"],
    }),

    // Renamed to getNotifications for better naming convention consistency
    getNotifications: builder.query({
      query: () => "/user/notifications",
      providesTags: ["Notifications"],
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

// Correctly map the hooks to the endpoint names
export const { 
  useGetUserStatsQuery, 
  useGetProfileQuery, 
  useGetNotificationsQuery, // Note the change here
  useUpdateProfileMutation 
} = userApiSlice;