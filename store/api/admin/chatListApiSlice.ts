import { apiSlice } from "../apiSlice";

export interface ChatUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IMessage {
  _id?: string;
  senderId: string;
  senderType: "USER" | "ADMIN";
  text: string;
  attachments: string[];
  createdAt: string;
}

export interface AdminChatThread {
  _id: string;
  userId: ChatUser;
  messages?: IMessage[]; // Populated when viewing a single full thread
  lastMessageAt: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SendAdminReplyPayload {
  id: string;            // The Chat document instance _id
  messageText: string;   // Maps to the backend body destructor keys
  attachments?: string[];
}

export const adminChatsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * 📥 Fetch the main admin inbox list stream
     */
    getAdminInbox: builder.query<AdminChatThread[], void>({
      query: () => "/admin/chatList", 
      providesTags: ["Chats"],
    }),

    /**
     * 💬 Fetch the full conversation details for a single chat thread instance by its ID
     */
    getAdminSingleChat: builder.query<AdminChatThread, string>({
      query: (id) => `/admin/chatList/${id}`,
      // Attaches a cache tag bound to the specific chat instance ID
      providesTags: (result, error, id) => [{ type: "Chats", id }],
    }),

    /**
     * 🚀 Send a response message into a user's open chat stream
     */
    sendAdminReply: builder.mutation<AdminChatThread, SendAdminReplyPayload>({
      query: ({ id, messageText, attachments }) => ({
        url: `/admin/chatList/${id}`,
        method: "POST",
        body: { messageText, attachments },
      }),
      // Invalidates both the specific open message block cache and the main inbox stream list item
      invalidatesTags: (result, error, { id }) => [
        "Chats",
        { type: "Chats", id }
      ],
    }),
  }),
});

export const { 
  useGetAdminInboxQuery,
  useGetAdminSingleChatQuery,
  useSendAdminReplyMutation
} = adminChatsApiSlice;