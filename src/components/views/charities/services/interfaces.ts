import { PageableGetResponse } from "@/lib/api/interfaces/table";

export enum OrganizationType {
  COMPANY = "COMPANY",
  INDIVIDUAL = "INDIVIDUAL",
  NON_PROFIT = "NON_PROFIT",
}

export interface Charity {
  userId: string;
  companyName: string;
  address: string;
  taxCode: string;
  stripeId: string;
  organizationType: OrganizationType;
  assetsKey: string;
}

export type CharityGetResponse = PageableGetResponse<Charity>;
