import { PageableGetResponse } from "@/lib/api/interfaces/table";

export interface Donor {
  userId: string;
  firstName: string;
  lastName: string;
  address: string;
  stripeId: string;
  assetsKey: string;
}

export type DonorGetResponse = PageableGetResponse<Donor>;
