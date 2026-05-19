import { apiSlice } from "../apiSlice";

export interface AdminWalletAddress {
  _id: string;
  name: string;         // e.g., "USDT (TRC20)", "Bitcoin (BTC)"
  address: string;      // The actual blockchain address
  network: string;      // e.g., "TRC20", "ERC20", "NATIVE BITCOIN"
  isActive: boolean;    // Toggle status for user display visibility
  createdAt: string;
  updatedAt: string;
}

export interface CreateWalletAddressPayload {
  name: string;
  address: string;
  network: string;
  isActive?: boolean;
}

export interface CreateWalletAddressResponse {
  success: boolean;
  message: string;
  wallet: AdminWalletAddress;
}

export const adminWalletsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Fetch ALL system payment destination wallets (Active and Inactive)
     */
    getAdminWalletAddresses: builder.query<AdminWalletAddress[], void>({
      query: () => "/admin/wallet-address",
      providesTags: ["AdminWalletAddress"],
    }),

    /**
     * Deploy a brand new blockchain deposit destination address to the system configuration registry
     */
    createAdminWalletAddress: builder.mutation<CreateWalletAddressResponse, CreateWalletAddressPayload>({
      query: (body) => ({
        url: "/admin/wallet-address",
        method: "POST",
        body,
      }),
      // Invalidates the list cache to trigger an immediate background refresh of your wallets view table
      invalidatesTags: ["AdminWalletAddress"],
    }),
  }),
});

export const { 
  useGetAdminWalletAddressesQuery, 
  useCreateAdminWalletAddressMutation 
} = adminWalletsApiSlice;