import { apiSlice } from "../apiSlice";

export interface AdminWalletView {
  _id: string;
  balance: number;
  referralBonus: number;
  totalInvested: number;
}

export interface ManagedUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "USER" | "ADMIN" | string;
  kycStatus: "PENDING" | "VERIFIED" | "UNVERIFIED";
  isSuspended?: boolean;
  wallet?: AdminWalletView;
  createdAt: string;
}

export interface AdjustWalletPayload {
  userId: string;
  amount: number;
  type: "balance" | "referralBonus" | "totalInvested";
  note?: string;
}

export const adminUsersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query<ManagedUser[], void>({
      query: () => "/admin/users",
      providesTags: ["User"],
    }),
    updateUserSystemProfile: builder.mutation<ManagedUser, { id: string; body: Partial<ManagedUser> }>({
      query: ({ id, body }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    adjustUserWallet: builder.mutation<{ message: string }, AdjustWalletPayload>({
      query: (body) => ({
        url: `/admin/wallet`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wallet", "User", "Transaction"],
    }),
  }),
});

export const { 
  useGetAdminUsersQuery, 
  useUpdateUserSystemProfileMutation, 
  useAdjustUserWalletMutation 
} = adminUsersApiSlice;