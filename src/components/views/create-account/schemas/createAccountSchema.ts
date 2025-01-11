import * as yup from 'yup';
import { CreateAccountFormFields } from '../types/interfaces';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

export const createAccountSchema: yup.ObjectSchema<CreateAccountFormFields> = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  firstName: yup
    .string()
    .when('userType', {
      is: 'person',
      then: (schema) => schema.required('First name is required'),
      otherwise: (schema) => schema.nullable()
    }),
  lastName: yup
    .string()
    .when('userType', {
      is: 'person',
      then: (schema) => schema.required('Last name is required'),
      otherwise: (schema) => schema.nullable()
    }),
  organizationName: yup
    .string()
    .when('userType', {
      is: (val: string) => val === 'company' || val === 'non-profit',
      then: (schema) => schema.required('Organization name is required'),
      otherwise: (schema) => schema.nullable()
    }),
  address: yup.string().nullable(),
  assetsKey: yup.string().nullable(),
  userType: yup
    .string()
    .oneOf(['person', 'company', 'non-profit'], 'Please select a valid user type')
    .required('Please select a user type'),
  image: yup
    .mixed()
    .required('Image is required')
    .test('fileSize', 'Max file size is 5MB', (value) => {
      if (!value || !value[0]) return false;
      return value[0].size <= MAX_FILE_SIZE;
    })
    .test('fileType', '.jpg, .jpeg, .png and .webp files are accepted', (value) => {
      if (!value || !value[0]) return false;
      return ACCEPTED_IMAGE_TYPES.includes(value[0].type);
    }),
  video: yup
    .mixed()
    .nullable()
    .test('fileSize', 'Max file size is 5MB', (value) => {
      if (!value || !value[0]) return true;
      return value[0].size <= MAX_FILE_SIZE;
    })
    .test('fileType', '.mp4, .webm and .ogg files are accepted', (value) => {
      if (!value || !value[0]) return true;
      return ACCEPTED_VIDEO_TYPES.includes(value[0].type);
    })
});

export type CreateAccountFormData = yup.InferType<typeof createAccountSchema>;
