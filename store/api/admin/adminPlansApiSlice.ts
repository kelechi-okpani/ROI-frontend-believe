import { apiSlice } from "../apiSlice";

export interface InvestmentPlan {
  _id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  roiPercentage: number;
  durationDays: number;
  category: "STARTER" | "PRO" | "ULTRA" | string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlanPayload {
  name: string;
  minAmount: number;
  maxAmount: number;
  roiPercentage: number;
  durationDays: number;
  category?: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface CreatePlanResponse {
  success: boolean;
  message: string;
  plan: InvestmentPlan;
}

export const adminPlansApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Fetch ALL investment packages (Active and Inactive) for control panel configuration
     */
    getAdminPlans: builder.query<InvestmentPlan[], void>({
      query: () => "/admin/plans",
      providesTags: ["InvestmentPlan"],
    }),

    /**
     * Deploy a brand new investment asset package profile to the system
     */
    createInvestmentPlan: builder.mutation<CreatePlanResponse, CreatePlanPayload>({
      query: (body) => ({
        url: "/admin/plans",
        method: "POST",
        body,
      }),
      // Invalidates the list cache so dashboard UI instantly reflects the new additions
      invalidatesTags: ["InvestmentPlan"],
    }),
  }),
});

export const { 
  useGetAdminPlansQuery, 
  useCreateInvestmentPlanMutation 
} = adminPlansApiSlice;