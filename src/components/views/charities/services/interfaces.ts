import { Pageable, Sort } from "@/lib/api/interfaces/table";

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

export interface CharityGetResponse {
  content: Charity[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}
