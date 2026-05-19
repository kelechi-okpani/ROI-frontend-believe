import { apiSlice } from "./apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Fetch chat messages
     * Users: No params needed (fetches their personal chat)
     * Admins: Pass { userId } to fetch a specific user's thread
     */
    getChat: builder.query({
      query: (params?: { userId: string }) => ({
        url: "/chat",
        params: params?.userId ? { userId: params.userId } : {},
      }),
      providesTags: (result, error, arg) => [
        { type: "chat", id: arg?.userId || "PERSONAL" }
      ],
    }),

    /**
     * Send a message
     * Users: Pass { text, attachments }
     * Admins: Must pass { text, receiverId, attachments }
     */
    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: "/chat/send",
        method: "POST",
        body: messageData,
      }),
      // Invalidates the specific chat thread to trigger a re-fetch
      invalidatesTags: (result, error, arg) => [
        { type: "chat", id: arg?.receiverId || "PERSONAL" }
      ],
    }),

    /**
     * Admin only: Fetch all active chat threads for the Social CRM list
     */
    getChatList: builder.query({
      query: () => "/admin/chatList",
      providesTags: ["chat"],
    }),
  }),
});

export const { 
  useGetChatQuery, 
  useSendMessageMutation, 
  useGetChatListQuery 
} = chatApiSlice;