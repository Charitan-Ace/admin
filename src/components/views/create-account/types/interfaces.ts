export type UserType = 'donor' | 'company' | 'non-profit';

export interface CreateAccountFormFields {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  image: FileList;
  video?: FileList;
}

export interface DonorCreateSchema {
  userId?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  assetKeys?: string;
}

export interface CreateDonorData {
  email: string;
  password: string;
  profile: DonorCreateSchema
  
}