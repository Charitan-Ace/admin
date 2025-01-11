
export type UserType = 'person' | 'company' | 'non-profit';

export interface CreateAccountFormFields {
  email: string;
  firstName?: string;
  lastName?: string;
  organizationName?: string;
  address?: string;
  assetsKey?: string;
  userType: UserType;
  image: FileList;
  video?: FileList;
}
