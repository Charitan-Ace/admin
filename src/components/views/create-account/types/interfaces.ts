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
